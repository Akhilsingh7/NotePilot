"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FormEvent, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SigninModal({ open, onOpenChange }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log("login value is", res);
    console.log("login response", res?.ok);
    console.log("login error", res?.error);
    if (res?.ok) {
      toast.success("Log In successfull");
      router.push("/dashboard");
      onOpenChange(false);
    }

    if (res?.error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">
            Welcome back
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-500">
            Sign in to continue to your dashboard.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={signInUser}>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Email</Label>
              <Input
                type="text"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Checkbox />
              <span>Remember me</span>
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>

            <p className="text-center text-sm text-gray-500">
              No account? Create one
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
