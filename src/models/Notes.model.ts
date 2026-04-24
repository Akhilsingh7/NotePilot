import mongoose, { Schema, Document } from "mongoose";

export interface Note extends Document {
  userId: string;
  title: string;
  content: string;
  projectId?: string;
  isPublic: boolean;
  likesCount: number;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema: Schema<Note> = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    projectId: {
      type: String,
      default: null,
    },

    isPublic: {
      type: Boolean,
      default: false,
      index: true,
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Note || mongoose.model<Note>("Note", NoteSchema);
