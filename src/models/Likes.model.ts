import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

export interface Like extends Document {
  userId: string;
  noteId: string;
  createdAt: Date;
}

const LikeSchema: Schema<Like> = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    noteId: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

LikeSchema.index({ userId: 1, noteId: 1 }, { unique: true });

export default mongoose.models.Like || mongoose.model<Like>("Like", LikeSchema);
