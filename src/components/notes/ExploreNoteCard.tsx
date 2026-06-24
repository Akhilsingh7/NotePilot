import { getPreviewText } from "@/helpers/getPreviewText";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addLikeNote, removeLikeNote } from "@/redux/slices/likesSlice";
import { Note } from "@/types/Note";
import axios from "axios";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useNoteActions } from "./useNoteAction";
useNoteActions;

type NoteCardProps = {
  note: Note;
  onLikeUpdate?: (noteId: string, likesCount: number) => void;
  // showPrivateBadge?: boolean;
  // showActions?: boolean;
};

function ExploreNoteCard({
  note,
  // onLikeUpdate,
  // showPrivateBadge = false,
  // showActions = true,
}: NoteCardProps) {
  const { data: session } = useSession();
  const likedNoteIds = useAppSelector((state) => state.likes.likedNoteIds);

  const dispatch = useAppDispatch();
  const { toggleLike } = useNoteActions();

  return (
    <Link key={note._id} href={`/notes/${note._id}`}>
      <article className="flex gap-8 py-2 border-b cursor-pointer hover:opacity-85 transition-opacity">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-stone-300 flex items-center justify-center text-xs font-semibold text-white">
              {note.authorName?.slice(0, 2).toUpperCase()}
            </div>
            <span className="text-sm font-semibold">{note.authorName}</span>
          </div>
          <h2 className="font-serif text-xl font-semibold leading-snug mb-2">
            {note.title}
          </h2>
          <p className="text-sm text-gray-500 line-clamp-2">
            {getPreviewText(note.content)} <span>...</span>
          </p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text- text-gray-400">
              <span>
                {new Date(note.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>

              <span>•</span>

              <span>Public</span>
            </div>

            <button
              className="flex items-center gap-1 text-gray-500 transition-colors "
              disabled={!session}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleLike(note._id);
              }}
            >
              <Heart
                className={`h-4 w-4 transition-all ${
                  likedNoteIds.includes(note._id)
                    ? "fill-black text-black"
                    : "text-gray-500"
                }`}
              />
              <span className="text-sm">{note.likesCount}</span>
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ExploreNoteCard;
