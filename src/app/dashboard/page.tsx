"use client";

import DashboardNoteCard from "@/components/notes/DashboardNoteCard";
import { useAppSelector } from "@/redux/hooks";
import {
  Heart,
  Pin,
  Search,
  Plus,
  Grid2X2,
  List,
  FileText,
} from "lucide-react";
import { useEffect } from "react";

const likedNotes = [
  {
    id: 4,
    title: "Rust for JS devs",
    description: "Ownership, borrowing and lifetimes...",
    date: "30 May 2026",
    likes: 89,
  },
  {
    id: 5,
    title: "Docker deep dive",
    description: "Multi-stage builds, networking...",
    date: "28 May 2026",
    likes: 57,
  },
  {
    id: 6,
    title: "Next.js 15 features",
    description: "Partial prerendering, caching...",
    date: "25 May 2026",
    likes: 112,
  },
];

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <p className="text-zinc-400 text-sm">{title}</p>

      <h2 className="mt-3 text-4xl font-bold">{value}</h2>
    </div>
  );
}
type SectionProps = {
  title: string;
  icon: React.ReactNode;
  notes: any[];
  maxItems?: number;
  href: string;
};

function Section({ title, icon, notes, maxItems = 3 }: SectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-xl font-semibold uppercase tracking-wide text-zinc-300">
            {title}
          </h2>
        </div>

        <button className="text-zinc-400 hover:text-white">See all</button>
      </div>

      {notes.length >= 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {notes.slice(0, maxItems).map((note) => (
            <DashboardNoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-700 p-10 text-center">
          No notes found
        </div>
      )}
    </section>
  );
}

export default function DashboardPage() {
  const likeNoteIds = useAppSelector((state) => state.likes.likedNoteIds);

  const loggedInUserNotes = useAppSelector((state) => state.notes.notes);

  // const likedNote  = loggedInUserNotes.filter((note)=>note._id ==likeNoteIds)

  // useEffect(()=>{

  // })

  const sections = [
    {
      title: "My Notes",
      notes: loggedInUserNotes,
      href: "/",
    },
    // {
    //   title: "Liked Notes",
    //   data: likeNoteIds,
    // },
    // { tittle: "Public Notes", datat: [] },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        {/* Header */}

        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-4xl font-bold">Dashboard</h1>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                placeholder="Search notes..."
                className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-10 pr-4 outline-none focus:border-zinc-600 sm:w-[260px]"
              />
            </div>

            <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-700 px-5 hover:bg-zinc-900">
              <Plus size={18} />
              New Note
            </button>
          </div>
        </div>

        {/* Stats */}

        <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard title="Total Notes" value={32} />
          {/* <StatCard title="Pinned" value={5} /> */}
          <StatCard title="Liked" value={12} />
          <StatCard title="Public" value={18} />
        </div>

        {/* Sections */}

        <div className="space-y-16">
          {sections.map((section) => (
            <Section
              title={section.title}
              icon={<span className="h-5 w-5 text-pink-500">⭐</span>}
              notes={section.notes}
              href={section.href}
            />
          ))}
          {/* <Section
            title="My Notes"
            icon={<span className="h-5 w-5 text-pink-500">⭐</span>}
            notes={likedNotes}
          />
          <Section
            title="Liked Notes"
            icon={<Heart className="h-5 w-5 text-pink-500" />}
            notes={likedNotes}
          /> */}
        </div>
      </div>
    </div>
  );
}
