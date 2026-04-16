"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SignupModal } from "@/components/auth/SignupModal";
import { SigninModal } from "@/components/auth/SigninModal";

export default function Home() {
  const [openSignup, setOpenSignup] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);

  return (
    <main className="min-h-screen bg-[#F7F4ED] text-black">
      <nav className="flex items-center justify-between px-10 py-4 border-b">
        <h1 className="text-2xl font-semibold">Notepilot</h1>

        <div className="flex items-center gap-6 text-sm">
          <span className="cursor-pointer">Our story</span>
          <span className="cursor-pointer">Membership</span>
          <span className="cursor-pointer">Write</span>

          <span className="cursor-pointer" onClick={() => setOpenSignin(true)}>
            Sign in
          </span>

          <Button className="rounded-full" onClick={() => setOpenSignup(true)}>
            Get started
          </Button>
        </div>
      </nav>

      <section className="flex items-center justify-between px-16 py-20">
        <div className="max-w-xl">
          <h1 className="text-7xl font-serif leading-tight">
            Human stories & ideas
          </h1>

          <p className="mt-6 text-lg text-gray-700">
            A place to read, write, and deepen your understanding
          </p>

          <Button
            className="mt-6 rounded-full px-6 py-3 text-lg"
            onClick={() => setOpenSignup(true)}
          >
            Start reading
          </Button>
        </div>

        <div className="w-100 h-100 bg-green-500 rounded-md hidden md:block" />
      </section>

      <SignupModal open={openSignup} onOpenChange={setOpenSignup} />
      <SigninModal open={openSignin} onOpenChange={setOpenSignin} />
    </main>
  );
}
