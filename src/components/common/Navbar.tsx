"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SignupModal } from "@/components/auth/SignupModal";
import { SigninModal } from "@/components/auth/SigninModal";

function Navbar() {
  const [openSignup, setOpenSignup] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);
  return (
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

      <SignupModal open={openSignup} onOpenChange={setOpenSignup} />
      <SigninModal open={openSignin} onOpenChange={setOpenSignin} />
    </nav>
  );
}

export default Navbar;
