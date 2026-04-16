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
import axios from "axios";
import { signIn } from "next-auth/react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SignupModal({ open, onOpenChange }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const sendDetailsForOtp = async () => {
    try {
      const res = await axios.post("/api/auth/send-otp", {
        email: email,
      });
      console.log("response", res.data);
    } catch (err: any) {
      console.log("error ", err.response.data);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post("/api/auth/verify-otp", {
        email: email,
        otp: otp,
      });
      console.log("response", res.data);
    } catch (err: any) {
      console.log("error ", err.response.data);
    }
  };

  const registerUser = async () => {
    try {
      const res = await axios.post("/api/auth/sign-up", {
        name: name,
        email: email,
        password: password,
      });
      console.log("response", res.data);

      if (res.data.success) {
        await signIn("credentials", {
          email: email,
          password: password,
          redirect: true,
          callbackUrl: "/dashboard",
        });
      }
    } catch (err: any) {
      console.log("error ", err.response.data);
    }
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
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="text"
                placeholder="Enter your email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                variant="outline"
                type="button"
                onClick={sendDetailsForOtp}
              >
                Send OTP
              </Button>
            </div>

            <Button className="w-full" type="button" onClick={verifyOtp}>
              Verify OTP
            </Button>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="button" className="w-full" onClick={registerUser}>
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
