import { Assessment } from "../models/Assessment.model.js";
import { CounsellorNotification } from "../models/CounsellorNotification.model.js";
import { Student } from "../models/Student.model.js";
import { Counsellor } from "../models/Counsellor.model.js";
import { Mood } from "../models/Mood.model.js";
import { CommunityPost } from "../models/CommunityPost.model.js";
import { AddQuotes } from "../models/Quotes.model.js";
import { AddLink } from "../models/Links.model.js";
import { Journal } from "../models/Journal.model.js";

//set mood
export const setMoodController = async (req, res) => {
  try {
    const { mood } = req.body;

    if (mood === undefined || mood === null) {
      return res.status(400).json({ error: "Mood is required" });
    }

    const allowedMoods = [-2, -1, 0, 1, 2];
    const moodValue = Number(mood);

    if (!allowedMoods.includes(moodValue)) {
      return res.status(400).json({ error: "Invalid mood value" });
    }

    const student = await Student.findOne({ userId: req.userId });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const lastMood = await Mood.findOne({ student: student._id })
      .sort({ createdAt: -1 }); // get latest entry

    if (lastMood) {
      const now = Date.now();
      const lastTimestamp = new Date(lastMood.createdAt).getTime();

      // difference in hours
      const hoursPassed = (now - lastTimestamp) / (1000 * 60 * 60);

      if (hoursPassed < 24) {
        return res.status(400).json({
          error: `You have already set your mood recently. You can set again after ${Math.ceil(24 - hoursPassed)} hours.`
        });
      }
    }

    await Mood.create({
      mood: moodValue,
      student: student._id
    });

    return res.status(201).json({
      message: "Mood set successfully"
    });

  } catch (error) {
    console.log("Error in set mood controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//Assessment test and notify to counsellor

const calculateSeverity = (score, type) => {
  if (type === 'phq-9') {
    if (score <= 4) return { level: 'minimal', isCritical: false };
    if (score <= 9) return { level: 'mild', isCritical: false };
    if (score <= 14) return { level: 'moderate', isCritical: false };
    if (score <= 19) return { level: 'moderately-severe', isCritical: false };
    return { level: 'severe', isCritical: true };
  } else if (type === 'gad-7') {
    if (score <= 4) return { level: 'minimal', isCritical: false };
    if (score <= 9) return { level: 'mild', isCritical: false };
    if (score <= 14) return { level: 'moderate', isCritical: false };
    return { level: 'severe', isCritical: true };
  }
  return { level: 'minimal', isCritical: false };
};

const notifyCounsellor = async (studentId, assessmentId, type, score, severity) => {
  try {
    const student = await Student.findById(studentId).populate('collegeName');

    if (!student) {
      console.error('Student not found');
      return false;
    }

    // Find all counsellors from the same college
    const counsellors = await Counsellor.find({
      collegeName: student.collegeName._id
    });

    if (counsellors.length === 0) {
      console.error('No counsellors found for this college');
      return false;
    }

    // Notify all counsellors from the same college
    const notifications = counsellors.map(counsellor => ({
      student: studentId,
      counsellor: counsellor._id,
      assessment: assessmentId,
      type,
      score,
      severity
    }));

    await CounsellorNotification.insertMany(notifications);

    return true;
  } catch (error) {
    console.error('Error notifying counsellor:', error);
    return false;
  }
};


export const submitAssessmentController = async (req, res) => {
  try {
    const { type, answers } = req.body;

    if (!type || !answers) {
      return res.status(400).json({ error: "Type and answers are required" });
    }

    if (!['phq-9', 'gad-7'].includes(type)) {
      return res.status(400).json({ error: "Invalid assessment type" });
    }

    const expectedLength = type === 'phq-9' ? 9 : 7;
    if (!Array.isArray(answers) || answers.length !== expectedLength) {
      return res.status(400).json({
        error: `Expected ${expectedLength} answers for ${type}`
      });
    }

    if (!answers.every(a => typeof a === 'number' && a >= 0 && a <= 3)) {
      return res.status(400).json({
        error: "All answers must be numbers between 0 and 3"
      });
    }

    const student = await Student.findOne({ userId: req.userId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const score = answers.reduce((sum, answer) => sum + answer, 0);
    const { level: severity, isCritical } = calculateSeverity(score, type);

    const assessment = await Assessment.create({
      student: student._id,
      type,
      answers,
      score,
      severity,
      isCritical,
      counsellorNotified: false
    });

    if (isCritical) {
      const notified = await notifyCounsellor(
        student._id,
        assessment._id,
        type,
        score,
        severity
      );

      if (notified) {
        assessment.counsellorNotified = true;
        assessment.notificationSentAt = new Date();
        await assessment.save();
      }
    }

    return res.status(201).json({
      message: "Assessment submitted successfully",
      data: {
        assessmentId: assessment._id,
        score,
        severity,
        isCritical,
        counsellorNotified: isCritical && assessment.counsellorNotified
      }
    });

  } catch (error) {
    console.log("Error in submit assessment controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// community post

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    // Extract hashtags
    const hashtags = (text.match(/#\w+/g) || [])
      .map(tag => tag.substring(1).toLowerCase())
      .filter((v, i, arr) => arr.indexOf(v) === i); // remove duplicates

    // Fetch user's anonymousName from Student model
    const student = await Student.findOne({ userId: req.userId });
    if (!student) return res.status(404).json({ message: "User not found" });

    const post = await CommunityPost.create({
      studentId: student._id,
      text,
      anonymousName: student.displayName,
      hashtags,
    });

    res.status(201).json({ success: true, post });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`error in creating post: ${err}`)
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find()
      .sort({ createdAt: -1 });

    res.json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`error in getAllPosts: ${err.message}`)
  }
};

export const toggleLike = async (req, res) => {
  try {
    const userId = req.user._id;
    const { postId } = req.params;

    const post = await CommunityPost.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      success: true,
      liked: !alreadyLiked,
      totalLikes: post.likes.length
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`error in toggleLike: ${err.message}`)
  }
};

export const reportPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { postId } = req.params;
    const { reason } = req.body;

    if (!reason) return res.status(400).json({ message: "Reason required" });

    const post = await CommunityPost.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyReported = post.reports.some(
      r => r.reportedBy.toString() === userId.toString()
    );

    if (alreadyReported) {
      return res.status(400).json({ message: "Already reported" });
    }

    post.reports.push({ reportedBy: userId, reason });
    await post.save();

    res.json({ success: true, message: "Reported successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`error in reporting post: ${err.message}`)
  }
};

export const deletePost = async (req, res) => {
  try {
    const user = req.user;
    const { postId } = req.params;

    const post = await CommunityPost.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // Fetch student profile to get studentId
    const student = await Student.findOne({ userId: user._id });
    if (!student) return res.status(404).json({ error: "Student profile not found" });

    // 1. Owner of post (compare studentId)
    const isOwner = post.studentId.toString() === student._id.toString();

    // 2. College authority
    const isAuthority = user.role === "admin";

    if (!isOwner && !isAuthority) {
      return res.status(403).json({
        error: "Only the post owner or college authority can delete this post"
      });
    }

    await CommunityPost.findByIdAndDelete(postId);

    res.json({ success: true, message: "Post deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(`error in deleting post: ${error}`);
  }
};


export const getTrendingTags = async (req, res) => {
  try {
    const trending = await CommunityPost.aggregate([
      {
        $unwind: "$hashtags"
      },
      {
        $group: {
          _id: "$hashtags",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]);

    res.json({ success: true, trending });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`error in getting trending tags: ${error}`);
  }
};


//resources

export const addquotes = async (req, res) => {
  try {
    const { quote } = req.body;
    const student = await Student.findOne({ userId: req.userId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    let quotes = await AddQuotes.findOne({ student: student._id });
    if (!quotes) {
      // Create new quotes document if it doesn't exist
      quotes = await AddQuotes.create({
        student: student._id,
        quotes: [quote]
      });
    } else {
      quotes.quotes.push(quote);
      await quotes.save();
    }

    res.status(200).json({ success: true, quotes });
  } catch (error) {
    console.log(`error in adding quotes: ${error}`);
    res.status(500).json({ error: error.message });
  }
}

export const addlinks = async (req, res) => {
  try {
    const { link } = req.body;
    const student = await Student.findOne({ userId: req.userId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    let links = await AddLink.findOne({ student: student._id });
    if (!links) {
      // Create new links document if it doesn't exist
      links = await AddLink.create({
        student: student._id,
        links: [link]
      });
    } else {
      links.links.push(link);
      await links.save();
    }

    res.status(200).json({ success: true, links });
  } catch (error) {
    console.log(`error in adding links: ${error}`);
    res.status(500).json({ error: error.message });
  }
}

export const getResources = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.userId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    let quotes = await AddQuotes.findOne({ student: student._id });
    let links = await AddLink.findOne({ student: student._id });

    // Create empty documents if they don't exist
    if (!quotes) {
      quotes = await AddQuotes.create({
        student: student._id,
        quotes: []
      });
    }

    if (!links) {
      links = await AddLink.create({
        student: student._id,
        links: []
      });
    }

    res.status(200).json({
      success: true,
      resources: {
        quotes: quotes.quotes,
        links: links.links
      }
    });
  } catch (error) {
    console.log(`error in getting resources: ${error}`);
    res.status(500).json({ error: error.message });
  }
}

export const deletequotes = async (req, res) => {
  try {
    const { idx } = req.params;
    const student = await Student.findOne({ userId: req.userId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const quotes = await AddQuotes.findOne({ student: student._id });
    if (!quotes) {
      return res.status(404).json({ error: "Quotes not found" });
    }

    // Remove by index
    const index = parseInt(idx);
    if (index >= 0 && index < quotes.quotes.length) {
      quotes.quotes.splice(index, 1);
      await quotes.save();
      res.status(200).json({ success: true, quotes });
    } else {
      res.status(400).json({ error: "Invalid index" });
    }
  } catch (error) {
    console.log(`error in deleting quotes: ${error}`);
    res.status(500).json({ error: error.message });
  }
}

export const deletelinks = async (req, res) => {
  try {
    const { idx } = req.params;
    const student = await Student.findOne({ userId: req.userId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const links = await AddLink.findOne({ student: student._id });
    if (!links) {
      return res.status(404).json({ error: "Links not found" });
    }

    // Remove by index
    const index = parseInt(idx);
    if (index >= 0 && index < links.links.length) {
      links.links.splice(index, 1);
      await links.save();
      res.status(200).json({ success: true, links });
    } else {
      res.status(400).json({ error: "Invalid index" });
    }
  } catch (error) {
    console.log(`error in deleting links: ${error}`);
    res.status(500).json({ error: error.message });
  }
}


//journal

export const createJournal = async (req, res) => {
  try {
    const { title, content } = req.body;
    const student = await Student.findOne({ userId: req.userId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const journal = await Journal.findOne({ student: student._id });
    if (!journal) {
      await Journal.create({
        student: student._id,
        content: [{
          title,
          content,
          date: new Date()
        }]
      });
    } else {
      journal.content.push({
        title,
        content,
        date: new Date()
      });
      await journal.save();
    }
    res.status(200).json({ success: true, journal });
  } catch (error) {
    console.log(`error in creating journal: ${error}`);
    res.status(500).json({ error: error.message });
  }
}

export const getJournal = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.userId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const journal = await Journal.findOne({ student: student._id });
    if (!journal) {
      // Return empty journal structure instead of 404
      return res.status(200).json({ success: true, journal: { content: [] } });
    }
    res.status(200).json({ success: true, journal });
  } catch (error) {
    console.log(`error in getting journal: ${error}`);
    res.status(500).json({ error: error.message });
  }
}

export const deleteJournal = async (req, res) => {
  try {
    const { idx } = req.params;
    const student = await Student.findOne({ userId: req.userId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const journal = await Journal.findOne({ student: student._id });
    if (!journal) {
      return res.status(404).json({ error: "Journal not found" });
    }

    // Remove by index
    const index = parseInt(idx);
    if (index >= 0 && index < journal.content.length) {
      journal.content.splice(index, 1);
      await journal.save();
      res.status(200).json({ success: true, journal });
    } else {
      res.status(400).json({ error: "Invalid index" });
    }
  } catch (error) {
    console.log(`error in deleting journal: ${error}`);
    res.status(500).json({ error: error.message });
  }
}

//mood analytics

export const getMoodAnalyticsController = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.userId });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Get mood data for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const moodRecords = await Mood.find({
      student: student._id,
      createdAt: { $gte: sevenDaysAgo }
    }).sort({ createdAt: 1 });

    // If no mood data exists
    if (moodRecords.length === 0) {
      return res.status(200).json({
        sevenDayTrend: [],
        weeklyBreakdown: [
          { mood: 'Very Happy', emoji: '😄', percentage: 0, color: '#8EA8FF' },
          { mood: 'Happy', emoji: '😊', percentage: 0, color: '#7ED7C2' },
          { mood: 'Neutral', emoji: '😐', percentage: 0, color: '#A9C1FF' },
          { mood: 'Sad', emoji: '😔', percentage: 0, color: '#F7B9F2' },
          { mood: 'Very Sad', emoji: '😢', percentage: 0, color: '#FFB3B3' }
        ],
        insights: {
          mostFrequentMood: null,
          leastFrequentMood: null,
          averageScore: 0,
          variability: 'No Data'
        }
      });
    }

    // ===== 1. 7-DAY MOOD TREND =====
    const sevenDayTrend = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Create a map of dates to mood scores
    const moodByDate = {};
    moodRecords.forEach(record => {
      const dateKey = new Date(record.createdAt).toDateString();
      moodByDate[dateKey] = record.mood;
    });

    // Generate last 7 days data
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toDateString();
      const dayName = days[date.getDay()];
      
      const moodScore = moodByDate[dateKey] !== undefined ? moodByDate[dateKey] : null;
      
      if (moodScore !== null) {
        sevenDayTrend.push({
          day: dayName,
          score: moodScore,
          mood: getMoodLabel(moodScore),
          emoji: getMoodEmoji(moodScore)
        });
      }
    }

    // ===== 2. WEEKLY MOOD BREAKDOWN =====
    const moodCounts = {
      2: 0,   // Very Happy
      1: 0,   // Happy
      0: 0,   // Neutral
      '-1': 0, // Sad
      '-2': 0  // Very Sad
    };

    moodRecords.forEach(record => {
      moodCounts[record.mood]++;
    });

    const totalRecords = moodRecords.length;
    const weeklyBreakdown = [
      {
        mood: 'Very Happy',
        emoji: '😄',
        percentage: Math.round((moodCounts[2] / totalRecords) * 100),
        color: '#8EA8FF'
      },
      {
        mood: 'Happy',
        emoji: '😊',
        percentage: Math.round((moodCounts[1] / totalRecords) * 100),
        color: '#7ED7C2'
      },
      {
        mood: 'Neutral',
        emoji: '😐',
        percentage: Math.round((moodCounts[0] / totalRecords) * 100),
        color: '#A9C1FF'
      },
      {
        mood: 'Sad',
        emoji: '😔',
        percentage: Math.round((moodCounts['-1'] / totalRecords) * 100),
        color: '#F7B9F2'
      },
      {
        mood: 'Very Sad',
        emoji: '😢',
        percentage: Math.round((moodCounts['-2'] / totalRecords) * 100),
        color: '#FFB3B3'
      }
    ];

    // ===== 3. MOOD INSIGHTS =====
    
    // Most and Least Frequent Mood
    let maxCount = 0;
    let minCount = totalRecords;
    let mostFrequentScore = 0;
    let leastFrequentScore = 0;

    Object.entries(moodCounts).forEach(([score, count]) => {
      const scoreNum = Number(score);
      if (count > maxCount) {
        maxCount = count;
        mostFrequentScore = scoreNum;
      }
      if (count < minCount && count > 0) {
        minCount = count;
        leastFrequentScore = scoreNum;
      }
    });

    // If all moods have 0 count except one, set least frequent to the one with 0
    if (minCount === totalRecords) {
      for (let score of [2, 1, 0, -1, -2]) {
        if (moodCounts[score] === 0) {
          leastFrequentScore = score;
          break;
        }
      }
    }

    // Average Mood Score
    const totalScore = moodRecords.reduce((sum, record) => sum + record.mood, 0);
    const averageScore = (totalScore / totalRecords).toFixed(1);

    // Mood Variability (Standard Deviation)
    const scores = moodRecords.map(record => record.mood);
    const mean = totalScore / totalRecords;
    const variance = scores.reduce((acc, score) => acc + Math.pow(score - mean, 2), 0) / totalRecords;
    const stdDev = Math.sqrt(variance);

    let variability;
    if (stdDev < 0.5) variability = 'Very Stable';
    else if (stdDev < 1.0) variability = 'Stable';
    else if (stdDev < 1.5) variability = 'Moderate';
    else if (stdDev < 2.0) variability = 'Variable';
    else variability = 'Highly Variable';

    const insights = {
      mostFrequentMood: {
        score: mostFrequentScore,
        mood: getMoodLabel(mostFrequentScore),
        emoji: getMoodEmoji(mostFrequentScore)
      },
      leastFrequentMood: {
        score: leastFrequentScore,
        mood: getMoodLabel(leastFrequentScore),
        emoji: getMoodEmoji(leastFrequentScore)
      },
      averageScore: Number(averageScore),
      variability
    };

    return res.status(200).json({
      sevenDayTrend,
      weeklyBreakdown,
      insights
    });

  } catch (error) {
    console.log("Error in mood analytics controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Helper functions
const getMoodEmoji = (score) => {
  if (score === 2) return '😄';
  if (score === 1) return '😊';
  if (score === 0) return '😐';
  if (score === -1) return '😔';
  return '😢';
};

const getMoodLabel = (score) => {
  if (score === 2) return 'Very Happy';
  if (score === 1) return 'Happy';
  if (score === 0) return 'Neutral';
  if (score === -1) return 'Sad';
  return 'Very Sad';
};