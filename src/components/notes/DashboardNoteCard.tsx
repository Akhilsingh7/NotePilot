import { getPreviewText } from "@/helpers/getPreviewText";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useNoteActions } from "./useNoteAction";
import { useAppSelector } from "@/redux/hooks";

export default function DashboardNoteCard({ note }: any) {
  const { toggleLike } = useNoteActions();
  const likedNoteIds = useAppSelector((state) => state.likes.likedNoteIds);

  return (
    <Link key={note._id} href={`/notes/${note._id}`} className="block h-full">
      <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:p-5 transition hover:border-zinc-700">
        <div className="mb-4 flex flex-wrap gap-2">
          {/* {note.pinned && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
            📌 Pinned
          </span>
        )} */}
          {/* 
        {note.visibility && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              note.visibility === "Public"
                ? "bg-lime-100 text-lime-700"
                : "bg-zinc-200 text-zinc-700"
            }`}
          >
            {note.visibility}
          </span>
        )} */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-stone-300 flex items-center justify-center text-xs font-semibold text-white">
              {note.authorName?.slice(0, 2).toUpperCase()}
            </div>
            <span className="text-sm font-semibold">{note.authorName}</span>
          </div>
        </div>

        <h3 className="mb-2 text-lg md:text-xl font-semibold leading-snug">
          {note.title}
        </h3>

        <p className="mb-6 line-clamp-3 text-zinc-400">
          {" "}
          {getPreviewText(note.content)}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-zinc-500">
          <span>
            {new Date(note.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>

          <button
            className="flex items-center gap-1 text-gray-500 transition-colors "
            // disabled={!session}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleLike(note._id);
            }}
          >
            <Heart
              className={`h-4 w-4 transition-all ${
                likedNoteIds.includes(note._id)
                  ? "fill-white text-black"
                  : "text-gray-500"
              }`}
            />
            <span className="text-sm text-white">{note.likesCount}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
