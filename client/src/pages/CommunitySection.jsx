import React, { useState, useEffect } from "react";
import {
  Heart,
  X,
  Plus,
  TrendingUp,
  Flag,
  Trash2,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  useCreateMyPost,
  useDeleteThePost,
  useGetAllPosts,
  useLikeThePost,
  useReportThePost,
  useGetStudentData,
} from "../apis/Student";

export const CommunitySection = () => {
  // Get current user from auth context (replace with actual)
  const { studentData } = useGetStudentData();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (studentData) {
      setCurrentUser({
        studentId: studentData.studentId,
        anonymousName: studentData.name,
        userId: studentData.userId,
      });
    }
  }, [studentData]);

  const { createPost, isPending: isCreating } = useCreateMyPost();
  const { allPosts, isLoading, isError, refetch } = useGetAllPosts();
  const { likePost } = useLikeThePost();
  const { deletePost, isPending: isDeleting } = useDeleteThePost();
  const { reportPost, isPending: isReporting } = useReportThePost();

  const [posts, setPosts] = useState([]);
  const [weekEndDate] = useState("Dec 8, 2025");

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [reportingPostId, setReportingPostId] = useState(null);
  const [deletingPostId, setDeletingPostId] = useState(null);

  const [reportReason, setReportReason] = useState("");
  const [newPostText, setNewPostText] = useState("");

  const reportReasons = [
    "Harmful or dangerous content",
    "Harassment or bullying",
    "Spam or misleading",
    "Inappropriate content",
    "Other",
  ];

  // Update local posts when API data changes
  useEffect(() => {
    if (allPosts?.posts && currentUser) {
      const transformedPosts = allPosts.posts.map((post) => {
        const hasReported = post.reports?.some(
          (report) => report.reportedBy === currentUser.userId
        );

        return {
          id: post._id,
          text: post.text,
          anonymousName: post.anonymousName,
          userId: post.studentId,
          likes: post.likes?.length || 0,
          timestamp: formatTimestamp(post.createdAt),
          liked: post.likes?.includes(currentUser.userId) || false,
          reported: hasReported,
        };
      });
      setPosts(transformedPosts);
    }
  }, [allPosts, currentUser]);

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Just now";

    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInMs = now - postDate;
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMins < 1) return "Just now";
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays === 1) return "1d ago";
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return postDate.toLocaleDateString();
  };

  // Calculate trending tags
  const calculateTrendingTags = () => {
    const count = {};

    posts.forEach((post) => {
      const tags = post.text.match(/#\w+/g) || [];
      tags.forEach((tag) => {
        const clean = tag.substring(1).toLowerCase();
        count[clean] = (count[clean] || 0) + 1;
      });
    });

    return Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag, c], index) => ({
        tag,
        count: c,
        color: [
          "bg-gradient-to-r from-[#DFFCEB] to-[#D6F6FF]",
          "bg-gradient-to-r from-[#D6F6FF] to-[#EDEBFF]",
          "bg-gradient-to-r from-[#EDEBFF] to-[#FFE9F6]",
          "bg-gradient-to-r from-[#FFE9F6] to-[#DFFCEB]",
          "bg-gradient-to-r from-[#DFFCEB] to-[#EDEBFF]",
        ][index],
      }));
  };

  const [trendingTags, setTrendingTags] = useState([]);

  useEffect(() => {
    if (posts.length > 0) {
      setTrendingTags(calculateTrendingTags());
    }
  }, [posts]);

  // Validate hashtags
  const validateAndCleanHashtags = (text) => {
    const hashtags = text.match(/#\w+/g) || [];
    const seenHashtags = new Set();
    const duplicates = [];

    hashtags.forEach((tag) => {
      const cleanTag = tag.toLowerCase();
      if (seenHashtags.has(cleanTag)) {
        duplicates.push(tag);
      } else {
        seenHashtags.add(cleanTag);
      }
    });

    return { isValid: duplicates.length === 0, duplicates };
  };

  // Create Post
  const handleCreatePost = async () => {
    if (!newPostText.trim()) return;

    const validation = validateAndCleanHashtags(newPostText);

    if (!validation.isValid) {
      toast.error(
        `Duplicate hashtags found: ${validation.duplicates.join(", ")}`
      );
      return;
    }

    try {
      await createPost({ text: newPostText.trim() });
      toast.success("Post created successfully!");
      setShowModal(false);
      setNewPostText("");
      refetch();
    } catch (err) {
      toast.error(err.message || "Failed to create post");
    }
  };

  // Like Post
  const handleLike = async (postId) => {
    try {
      // Optimistic update
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
              ...post,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
              liked: !post.liked,
            }
            : post
        )
      );

      await likePost({ postId });
    } catch (error) {
      // Revert on error
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
              ...post,
              likes: post.liked ? post.likes + 1 : post.likes - 1,
              liked: !post.liked,
            }
            : post
        )
      );
      toast.error("Failed to update like");
    }
  };

  // Report
  const handleReportClick = (postId) => {
    setReportingPostId(postId);
    setReportReason("");
    setShowReportModal(true);
  };

  const handleSubmitReport = async () => {
    if (!reportReason) return;

    try {
      await reportPost({
        postId: reportingPostId,
        reason: reportReason,
      });

      toast.success("Post reported successfully");
      setShowReportModal(false);
      setReportingPostId(null);
      setReportReason("");
      refetch();
    } catch (error) {
      toast.error(error.message || "Failed to report post");
    }
  };

  // Delete
  const handleDeleteClick = (postId) => {
    setDeletingPostId(postId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePost(deletingPostId);
      toast.success("Post deleted successfully");
      setShowDeleteModal(false);
      setDeletingPostId(null);
      refetch();
    } catch (error) {
      toast.error(error.message || "Failed to delete post");
      setShowDeleteModal(false);
      setDeletingPostId(null);
    }
  };

  // console.log(allPosts);

  const isOwnPost = (post) => currentUser && post.userId === currentUser.studentId;

  const highlightHashtags = (text) => {
    return text.split(/(#\w+)/g).map((part, i) =>
      part.startsWith("#") ? (
        <span key={i} className="text-purple-500 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#DFFCEB] via-[#D6F6FF] via-[#EDEBFF] to-[#FFE9F6] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading community posts...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#DFFCEB] via-[#D6F6FF] via-[#EDEBFF] to-[#FFE9F6] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Posts
          </h2>
          <p className="text-gray-600 mb-4">
            We couldn't load the community posts. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="bg-gradient-to-r from-[#EDEBFF] to-[#D6F6FF] text-gray-800 font-semibold px-6 py-3 rounded-xl hover:shadow-md transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DFFCEB] via-[#D6F6FF] via-[#EDEBFF] to-[#FFE9F6] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Anonymous Community
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Posting as:{" "}
                <span className="font-semibold text-purple-600">
                  {currentUser?.anonymousName}
                </span>
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#EDEBFF] to-[#D6F6FF] text-gray-700 px-4 py-2 rounded-xl font-semibold hover:shadow-md transition-all duration-200"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Create Post</span>
            </button>
          </div>
        </div>

        {/* Trending Tags */}
        {trendingTags.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-gray-600" />
                <h2 className="text-lg font-bold text-gray-800">
                  Trending This Week
                </h2>
              </div>
              <span className="text-xs text-gray-400">Resets {weekEndDate}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {trendingTags.map((item, index) => (
                <span
                  key={index}
                  className={`${item.color} px-4 py-2 rounded-full text-sm font-medium text-gray-700 cursor-pointer hover:shadow-md transition-all duration-200 flex items-center gap-2`}
                >
                  <span className="font-bold text-xs bg-white bg-opacity-60 px-2 py-0.5 rounded-full">
                    {index + 1}
                  </span>
                  #{item.tag}
                  <span className="text-xs opacity-75">({item.count})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#EDEBFF] to-[#D6F6FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💬</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No posts yet
            </h3>
            <p className="text-gray-600 mb-4">
              Be the first to share something with the community!
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-[#EDEBFF] to-[#D6F6FF] text-gray-800 font-semibold px-6 py-3 rounded-xl hover:shadow-md transition-all"
            >
              Create First Post
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
              >
                {/* Top */}
                <div className="flex justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DFFCEB] to-[#D6F6FF] flex justify-center items-center">
                      <span className="text-lg">🎭</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {post.anonymousName}
                      </p>
                      <p className="text-xs text-gray-400">{post.timestamp}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isOwnPost(post) ? (
                      <button
                        onClick={() => handleDeleteClick(post.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete your post"
                      >
                        <Trash2 size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReportClick(post.id)}
                        disabled={post.reported}
                        className={`text-gray-400 hover:text-red-500 transition-colors ${post.reported ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        title={post.reported ? "Already reported" : "Report post"}
                      >
                        <Flag
                          size={18}
                          fill={post.reported ? "currentColor" : "none"}
                        />
                      </button>
                    )}
                  </div>
                </div>

                {/* Text */}
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                  {highlightHashtags(post.text)}
                </p>

                {/* Likes */}
                <div className="flex items-center gap-4 text-gray-500 text-sm border-t pt-3">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1 hover:text-pink-500 transition-colors"
                  >
                    <Heart
                      size={20}
                      className={
                        post.liked ? "fill-pink-500 text-pink-500" : ""
                      }
                    />
                    <span className="font-medium">{post.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- CREATE MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isCreating}
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Share Anonymously
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Posting as:{" "}
              <span className="font-semibold text-purple-600">
                {currentUser?.anonymousName}
              </span>
            </p>

            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="What's on your mind? Use #hashtags to connect with others..."
              className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-purple-300 transition-colors"
              disabled={isCreating}
            />

            <button
              onClick={handleCreatePost}
              disabled={!newPostText.trim() || isCreating}
              className="w-full mt-4 bg-gradient-to-r from-[#EDEBFF] via-[#D6F6FF] to-[#DFFCEB] text-gray-800 font-bold py-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Anonymously"
              )}
            </button>
          </div>
        </div>
      )}

      {/* --- REPORT MODAL --- */}
      {showReportModal && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 relative">
            <button
              onClick={() => setShowReportModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isReporting}
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Flag size={24} className="text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Report Post</h2>
                <p className="text-sm text-gray-500">
                  Help us keep the community safe
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              Please select a reason for reporting this post:
            </p>

            <div className="space-y-2 mb-6">
              {reportReasons.map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${reportReason === reason
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="report"
                    value={reason}
                    checked={reportReason === reason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="mr-3 accent-red-500"
                    disabled={isReporting}
                  />
                  <span className="text-gray-700">{reason}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                disabled={isReporting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReport}
                disabled={!reportReason || isReporting}
                className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isReporting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Reporting...
                  </>
                ) : (
                  "Submit Report"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE MODAL --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 relative">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isDeleting}
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Delete Post</h2>
                <p className="text-sm text-gray-500">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-base mb-6">
              Are you sure you want to delete this post? This will permanently
              remove it from the community.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Post"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};