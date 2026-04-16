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
import { useState } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SignupModal({ open, onOpenChange }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const sendDetailsForOtp = (e: any) => {
    const nameOfInput = e.target.name;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">
            Create your account
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-500">
            Create your account to start writing and managing notes.
          </DialogDescription>
        </DialogHeader>

        <form action="">
          <div className="space-y-4 mt-4">
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                name="username"
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="text"
                placeholder="Enter your email"
                value={email}
                name="email"
              />
            </div>

            <div className="flex gap-2">
              <Input placeholder="Enter OTP" />
              <Button variant="outline" type="button">
                Send OTP
              </Button>
            </div>

            <Button className="w-full" type="button">
              Verify OTP
            </Button>

            <div>
              <Label>Password</Label>
              <Input type="password" placeholder="Enter password" />
            </div>

            <Button className="w-full" disabled>
              Sign up
            </Button>

            <p className="text-center text-sm text-gray-500">
              Already have an account? Sign in
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
