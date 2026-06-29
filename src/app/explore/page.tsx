"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import NoteCardSkeleton from "@/components/notes/NoteCardSkeleton";
import ExploreNoteCard from "@/components/notes/ExploreNoteCard";
import { notesSelectors, upsertManyNotes } from "@/redux/slices/notesSlice";

function Explore() {
  const [loading, setLoading] = useState(true);

  const notes = useAppSelector(notesSelectors.selectAll);

  const publicNotes = notes.filter((note) => note.isPublic);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPublicNotes = async () => {
      try {
        const res = await axios.get("/api/public-notes");

        console.log("public notes are", res.data);

        if (res.data.success) {
          dispatch(upsertManyNotes(res.data.data));
        }
      } catch (error) {
        console.log("Error fetching notes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicNotes();
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-[#fdfdfc]">
      <section className="border-b bg-[#f7f4ed]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight max-w-3xl">
            Explore ideas, stories & knowledge
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Discover thoughts, tutorials, experiences, and insights shared by
            people around the world.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {loading ? (
            <>
              {[1, 2, 3, 4].map((item) => (
                <NoteCardSkeleton key={item} />
              ))}
            </>
          ) : publicNotes.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No public notes found.
            </div>
          ) : (
            publicNotes.map((note) => (
              <ExploreNoteCard note={note} key={note._id} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default Explore;
