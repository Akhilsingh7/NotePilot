export type Note = {
  _id: string;

  authorName: string;

  userId: string;

  title: string;

  content: any[];

  projectId?: string | null;

  isPublic: boolean;

  likesCount: number;

  isPinned: boolean;

  createdAt: string;

  updatedAt: string;
};
