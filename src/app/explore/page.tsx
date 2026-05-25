"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getPreviewText } from "@/helpers/getPreviewText";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLikedNotes } from "@/redux/slices/likesSlice";
import NoteCard from "@/components/notes/NoteCard";
import NoteCardSkeleton from "@/components/notes/NoteCardSkeleton";

type Note = {
  authorName: string;
  _id: string;
  title: string;
  content: any[];
  createdAt: string;
  likesCount: number;
};

function Explore() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  const { data: session } = useSession();

  useEffect(() => {
    const fetchPublicNotes = async () => {
      try {
        const res = await axios.get("/api/public-notes");

        console.log("notes are", res.data.data);

        setNotes(res.data.data);
      } catch (error) {
        console.log("Error fetching notes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicNotes();
  }, []);

  useEffect(() => {
    const fetchLikedNotes = async () => {
      if (!session) return;

      try {
        const res = await axios.get("/api/likes");

        if (res.data.success) {
          dispatch(setLikedNotes(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchLikedNotes();
  }, [session]);

  return (
    <main className="min-h-screen bg-[#fdfdfc]">
      <section className="border-b bg-[#f7f4ed]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-5xl font-serif leading-tight max-w-3xl">
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
          ) : notes.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No public notes found.
            </div>
          ) : (
            notes.map((note) => <NoteCard note={note} key={note._id} />)
          )}
        </div>
      </section>
    </main>
  );
}

export default Explore;
