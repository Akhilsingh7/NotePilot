"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <section className="bg-[#F7F4ED] text-black flex flex-col flex-1  md:flex-row items-center justify-between px-6 md:px-16 py-12 md:py-20">
      <div className="max-w-xl">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-tight">
          Human stories & ideas
        </h1>

        <p className="mt-6 text-lg text-gray-700">
          A place to read, write, and deepen your understanding
        </p>
        <Button
          className="
            mt-6 rounded-full px-6 py-3 text-lg
            bg-black text-white
            transition-all duration-200
            hover:bg-gray-800
            hover:scale-105
            active:scale-95
            cursor-pointer
            shadow-md hover:shadow-lg
          "
          onClick={() => router.push("/explore")}
        >
          Start reading
        </Button>
      </div>

      <div className="w-100 h-100 bg-green-500 rounded-md hidden md:block" />
    </section>
  );
}
