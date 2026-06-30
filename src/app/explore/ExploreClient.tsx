"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import NoteCardSkeleton from "@/components/notes/NoteCardSkeleton";
import ExploreNoteCard from "@/components/notes/ExploreNoteCard";
import { notesSelectors, upsertManyNotes } from "@/redux/slices/notesSlice";
import { Note } from "@/types/Note";

type Props = {
  notes: Note[];
};

function Explore({ notes }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(upsertManyNotes(notes));
  }, [notes, dispatch]);

  if (notes.length === 0) {
    return <div className="text-center py-20">No public notes found.</div>;
  }
  return (
    <div className="flex flex-col w-full">
      <section className="border-b bg-[#f7f4ed]">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-10 ">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif leading-tight max-w-3xl">
            Explore ideas, stories & knowledge
          </h1>

          <p className="mt-6 text-md text-sm-lg text-gray-600 max-w-xl">
            Discover thoughts, tutorials, experiences, and insights shared by
            people around the world.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-8">
          {notes.map((note) => (
            <ExploreNoteCard note={note} key={note._id} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Explore;
