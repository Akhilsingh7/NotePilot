import type { PartialBlock } from "@blocknote/core";

export type NoteContent = PartialBlock[];

export type Note = {
  _id: string;

  authorName: string;

  userId: string;

  title: string;

  content: NoteContent;

  projectId?: string | null;

  isPublic: boolean;

  likesCount: number;

  isPinned: boolean;

  createdAt: string;

  updatedAt: string;
};
