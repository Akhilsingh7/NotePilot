import { getPreviewText } from "@/helpers/getPreviewText";
import { useAppSelector } from "@/redux/hooks";
import { Note } from "@/types/Note";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useNoteActions } from "./useNoteAction";
import toast from "react-hot-toast";

type NoteCardProps = {
  note: Note;
  onLikeUpdate?: (noteId: string, likesCount: number) => void;
};

function ExploreNoteCard({ note }: NoteCardProps) {
  const { data: session } = useSession();
  const likedNoteIds = useAppSelector((state) => state.likes.likedNoteIds);

  const { toggleLike } = useNoteActions();
  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      toast.error("Login to Like");
      return;
    }

    toggleLike(note._id);
  };

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

              {session && (
                <>
                  <span>•</span>{" "}
                  <span>{note.isPublic ? "Public" : "Private"}</span>{" "}
                </>
              )}
            </div>

            <button
              className="flex items-center gap-1 text-gray-500 transition-colors "
              onClick={handleLikeClick}
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
