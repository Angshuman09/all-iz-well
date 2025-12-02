import { Assessment } from "../models/Assessment.model.js";
import { CounsellorNotification } from "../models/CounsellorNotification.model.js";
import { Student } from "../models/Student.model.js";
import { Counsellor } from "../models/Counsellor.model.js";
import { Mood } from "../models/Mood.model.js";
import { CommunityPost } from "../models/CommunityPost.model.js";

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

        const student = await Student.findOne({userId: req.userId});
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
    const student = await Student.findOne({ userId: req.userId }).populate('displayName');
    if (!student) return res.status(404).json({ message: "User not found" });

    const post = await CommunityPost.create({
      studentId: student._id ,
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
    const postId = req.params.id;

    const post = await CommunityPost.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // 1. Owner of post
    const isOwner = post.user.toString() === user._id.toString();

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
