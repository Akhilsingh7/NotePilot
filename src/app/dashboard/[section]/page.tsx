"use client";
import ExploreNoteCard from "@/components/notes/ExploreNoteCard";
import NoteCardSkeleton from "@/components/notes/NoteCardSkeleton";
import { useAppSelector } from "@/redux/hooks";
import { notesSelectors } from "@/redux/slices/notesSlice";
import { Note } from "@/types/Note";
import { useSession } from "next-auth/react";
import { use } from "react";

export default function DashboardSectionPages({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = use(params);
  const { data: session } = useSession();
  const likeNoteIds = useAppSelector((state) => state.likes.likedNoteIds);

  const allNotes = useAppSelector(notesSelectors.selectAll);

  let notes = [];

  const configureNotes: any = {
    "my-notes": {
      tittle: "My Notes",
      filter: (note: Note) => note.userId === session?.user.id,
    },
    "liked-notes": {
      tittle: "Liked Notes",
      filter: (note: Note) => likeNoteIds.includes(note._id),
    },
  };

  const presentSection = configureNotes[section];

  notes = allNotes.filter(presentSection.filter);

  return (
    <main className="min-h-screen bg-[#fdfdfc]">
      <section className="border-b bg-[#f7f4ed]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight max-w-3xl">
            {presentSection.tittle}
          </h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {notes.map((note) => (
            <ExploreNoteCard note={note} key={note._id} />
          ))}
        </div>
      </section>
    </main>
  );
}
