import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

import { useAppDispatch } from "@/redux/hooks";
import { addLikeNote, removeLikeNote } from "@/redux/slices/likesSlice";

export function useNoteActions() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const toggleLike = async (
    noteId: string,
    onLikeUpdate?: (noteId: string, likesCount: number) => void
  ) => {
    try {
      if (!session) {
        toast.error("Please login to like");
        return;
      }

      const res = await axios.post(`/api/likes/${noteId}`);

      const data = res.data.data;

      if (data.liked) {
        dispatch(addLikeNote(noteId));
      } else {
        dispatch(removeLikeNote(noteId));
      }

      onLikeUpdate?.(data.noteId, data.likesCount);
    } catch {
      console.log("error liking note");
    }
  };

  return {
    toggleLike,
  };
}
