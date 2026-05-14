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
import { useEffect, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SignupModal({ open, onOpenChange }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [sendOtpDisable, setOtpDisable] = useState(false);

  const [verifyOtpDisable, setVerifyOtpDisable] = useState(false);

  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const sendDetailsForOtp = async () => {
    try {
      const res = await axios.post("/api/auth/send-otp", {
        email: email,
      });
      console.log("send-details-for-otp", res.data);
      if (res.data.success) {
        toast.success("Otp Send Successuffuly");
        setCooldown(60);
      }
    } catch (err: any) {
      setOtpDisable(false);
      const status = err?.response?.status;
      const message = err?.response?.data?.message;

      if (status === 429) {
        toast("OTP already sent. Please wait", {
          icon: "⏳",
        });
        setCooldown(60);
      } else if (status === 400) {
        toast.error(message || "Invalid email");
      } else {
        toast.error("Something went wrong");
      }

      console.log("error:", err?.response?.data);
    }
  };

  const verifyOtp = async () => {
    try {
      setVerifyOtpDisable(true);
      const res = await axios.post("/api/auth/verify-otp", {
        email: email,
        otp: otp,
      });
      console.log("response", res.data);

      if (res?.data?.success) {
        setOtp("");
        toast.success("User verified Successfully");
      }
    } catch (err: any) {
      setOtp("");
      console.log("error ", err.response.data);
      setVerifyOtpDisable(false);

      const status = err?.response?.status;
      const message = err?.response?.data?.message;

      if (status === 400) {
        toast.error(message || "Something went wrong");
      } else {
        toast.error("Error verifying user. Please try again later");
      }
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
        toast.success("Signup succesfull");
        await signIn("credentials", {
          email: email,
          password: password,
          redirect: true,
          callbackUrl: "/dashboard",
        });
      }
    } catch (err: any) {
      console.log("error ", err.response.data);
      const message = err?.response?.data?.message;
      const errors = err?.response?.data?.errors;

      if (errors) {
        Object.values(errors).forEach((msg: any) => {
          toast.error(msg);
        });
      } else {
        toast.error(message || "Signup failed");
      }
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
                required
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
                disabled={cooldown > 0}
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Send OTP"}
              </Button>
            </div>

            <Button
              className="w-full"
              type="button"
              onClick={verifyOtp}
              disabled={verifyOtpDisable}
            >
              {verifyOtpDisable ? "Verified" : " Verify OTP"}
            </Button>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="button"
              className="w-full"
              onClick={registerUser}
              disabled={!verifyOtpDisable}
            >
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
