"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SignupModal } from "../auth/SignupModal";
import { SigninModal } from "../auth/SigninModal";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  const [openSignup, setOpenSignup] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);

  return (
    <header className="border-b bg-white">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-3xl font-semibold">
          Notepilot
        </Link>

        <div className="flex items-center  text-md font-medium">
          {/* <Link href="/our-story" className="hover:text-gray-600 transition">
            Our story
          </Link> */}

          <Link href="/explore" className="hover:text-gray-600 transition">
            Explore
          </Link>

          {!session ? (
            <div className="flex items-center gap-4 ml-4">
              <button
                onClick={() => setOpenSignin(true)}
                className="hover:text-gray-600 transition"
              >
                Sign in
              </button>

              <Button
                className="rounded-full"
                onClick={() => setOpenSignup(true)}
              >
                Get started
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4 ml-4">
              <Link href="/write" className="hover:text-gray-600 transition">
                Write
              </Link>

              <Link href="/dashboard" className="hover:text-gray-600">
                Dashboard
              </Link>

              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </nav>

      <SignupModal open={openSignup} onOpenChange={setOpenSignup} />
      <SigninModal open={openSignin} onOpenChange={setOpenSignin} />
    </header>
  );
}
