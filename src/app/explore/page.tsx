"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getPreviewText } from "@/helpers/getPreviewText";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

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

  // const increaseLikes

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
                <Card key={item} className="border-none shadow-none">
                  <CardContent className="p-0 space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : notes.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No public notes found.
            </div>
          ) : (
            notes.map((note) => (
              <Link key={note._id} href={`/explore/${note._id}`}>
                <article className="flex gap-8 py-2 border-b cursor-pointer hover:opacity-85 transition-opacity">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-stone-300 flex items-center justify-center text-xs font-semibold text-white">
                        {note.authorName?.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm font-semibold">
                        {note.authorName}
                      </span>
                    </div>
                    <h2 className="font-serif text-xl font-semibold leading-snug mb-2">
                      {note.title}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {getPreviewText(note.content)}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 text- text-gray-400">
                        <span>
                          {new Date(note.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>

                        <span>•</span>

                        <span>Public</span>
                      </div>

                      <button className="flex items-center gap-1 text-gray-500 transition-colors ">
                        <Heart className="h-4 w-4 hover:fill-black" />

                        <span className="text-sm">{note.likesCount}</span>
                      </button>
                    </div>
                  </div>
                </article>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default Explore;
