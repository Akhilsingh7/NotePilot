"use client";
import ExploreNoteCard from "@/components/notes/ExploreNoteCard";
import { useAppSelector } from "@/redux/hooks";
import { notesSelectors } from "@/redux/slices/notesSlice";
import { Note } from "@/types/Note";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
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

  const configureNotes: Record<
    string,
    { title: string; filter: (note: Note) => boolean }
  > = {
    "my-notes": {
      title: "My Notes",
      filter: (note: Note) => note.userId === session?.user.id,
    },
    "liked-notes": {
      title: "Liked Notes",
      filter: (note: Note) => likeNoteIds.includes(note._id),
    },
  };

  const presentSection = configureNotes[section];
  if (!presentSection) {
    notFound();
  }

  const notes = allNotes.filter(presentSection.filter);

  return (
    <main className="min-h-screen bg-[#fdfdfc]">
      <section className="border-b bg-[#f7f4ed]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight max-w-3xl">
            {presentSection.title}
          </h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {notes.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No notes found.
            </div>
          ) : (
            notes.map((note) => <ExploreNoteCard note={note} key={note._id} />)
          )}
        </div>
      </section>
    </main>
  );
}
