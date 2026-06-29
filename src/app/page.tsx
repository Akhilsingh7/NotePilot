"use client";

// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  // const [openSignup, setOpenSignup] = useState(false);
  // const [openSignin, setOpenSignin] = useState(false);

  // const { data: session, status } = useSession();

  // console.log("data for session", session);
  // console.log("status for session", status);

  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F7F4ED] text-black">
      {/* <nav className="flex items-center justify-between px-10 py-4 border-b">
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
      </nav> */}

      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 md:py-20">
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

      {/* <SignupModal open={openSignup} onOpenChange={setOpenSignup} />
      <SigninModal open={openSignin} onOpenChange={setOpenSignin} /> */}
    </main>
  );
}
