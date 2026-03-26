import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    journal: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Date,
    },
    abstract: {
      type: String,
      default: '',
    },
    doi: {
      type: String,
      trim: true,
    },
    keywords: [
      {
        type: String,
      },
    ],
    totalCopies: {
      type: Number,
      required: true,
      default: 1,
    },
    availableCopies: {
      type: Number,
      required: true,
      default: 1,
    },
    url: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Article', articleSchema);
