import mongoose from "mongoose";

const communityPostSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    anonymousName: {
      type: String,
      required: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      }
    ],

    reports: [
      {
        reportedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        reason: { type: String, required: true },
        reportedAt: { type: Date, default: Date.now }
      }
    ],

    hashtags: [
      {
        type: String,
        lowercase: true,
        trim: true
      }
    ]
  },
  { timestamps: true }
);

export const CommunityPost = mongoose.model("CommunityPost", communityPostSchema);