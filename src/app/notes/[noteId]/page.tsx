"use client";
import dynamic from "next/dynamic";

const NotePage = dynamic(() => import("./NotePageClient"), { ssr: false });

export default NotePage;
