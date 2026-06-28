"use client";

import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SignupModal } from "../auth/SignupModal";
import { SigninModal } from "../auth/SigninModal";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  const [openSignup, setOpenSignup] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();

  const navLinks = !session
    ? [
        { label: "Explore", href: "/explore" },
        { label: "Sign in", onClick: () => setOpenSignin(true) },
        {
          label: "Get started",
          onClick: () => setOpenSignup(true),
          isButton: true,
        },
      ]
    : [
        { label: "Explore", href: "/explore" },
        { label: "Write", href: "/write" },
        { label: "Dashboard", href: "/dashboard" },
        {
          label: "Logout",
          onClick: () => signOut({ callbackUrl: "/" }),
          isButton: true,
        },
      ];

  return (
    <header className="border-b bg-white relative">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-3xl font-semibold">
          Notepilot
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center text-md font-medium">
          <Link
            href="/explore"
            className={`hover:text-gray-600 transition ${pathname == "/explore" && "text-black font-semibold"}`}
          >
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
              <Link
                href="/write"
                className={`hover:text-gray-600 transition ${pathname == "/write" && "text-black font-bold"}`}
              >
                Write
              </Link>

              <Link
                href="/dashboard"
                className={`hover:text-gray-600 transition ${pathname == "/dashboard" && "text-black font-semibold"}`}
              >
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-3">
          <Link
            href="/explore"
            className={`block hover:text-gray-600 transition ${pathname == "/explore" && "text-black font-semibold"}`}
            onClick={() => setMobileOpen(false)}
          >
            Explore
          </Link>

          {!session ? (
            <>
              <button
                onClick={() => {
                  setOpenSignin(true);
                  setMobileOpen(false);
                }}
                className="block w-full text-left hover:text-gray-600 transition"
              >
                Sign in
              </button>

              <Button
                className="rounded-full w-full"
                onClick={() => {
                  setOpenSignup(true);
                  setMobileOpen(false);
                }}
              >
                Get started
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/write"
                className={`block hover:text-gray-600 transition ${pathname == "/write" && "text-black font-bold"}`}
                onClick={() => setMobileOpen(false)}
              >
                Write
              </Link>

              <Link
                href="/dashboard"
                className={`block hover:text-gray-600 transition ${pathname == "/dashboard" && "text-black font-semibold"}`}
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>

              <Button
                variant="outline"
                className="rounded-full w-full"
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setMobileOpen(false);
                }}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      )}

      <SignupModal open={openSignup} onOpenChange={setOpenSignup} />
      <SigninModal open={openSignin} onOpenChange={setOpenSignin} />
    </header>
  );
}
