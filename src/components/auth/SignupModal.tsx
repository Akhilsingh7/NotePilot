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
import toast from "react-hot-toast";
import PasswordInput from "../common/PasswordInput";
import { useSendOtp } from "./hooks/useSendOtp";
import { useVerifyOtp } from "./hooks/useVerifyOtp";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SignupModal({ open, onOpenChange }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const { sendOtp, cooldown, sendLoading } = useSendOtp();

  const { verifyOtp, verifyLoading } = useVerifyOtp();

  const verifyOtpHandler = async () => {
    const success = await verifyOtp(email, otp, "sign-up");

    if (success) {
      setOtp("");
      setIsOtpVerified(true);
    }
  };

  const registerUser = async () => {
    try {
      const res = await axios.post("/api/auth/sign-up", {
        purpose: "sign-up",
        data: {
          name: name,
          email: email,
          password: password,
        },
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
    } catch (err) {
      console.log("error ", axios.isAxiosError(err) ? err.response?.data : err);
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message
        : undefined;
      const errors = axios.isAxiosError(err)
        ? err.response?.data?.errors
        : undefined;

      if (errors) {
        Object.values(errors).forEach((msg) => {
          toast.error(String(msg));
        });
      } else {
        toast.error(message || "Signup failed");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-xl">
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
            <div className="flex flex-col gap-2">
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

            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input
                type="text"
                placeholder="Enter your email"
                value={email}
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsOtpVerified(false);
                }}
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
                onClick={() => sendOtp(email, "sign-up")}
                disabled={sendLoading || cooldown > 0}
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Send OTP"}
              </Button>
            </div>

            <Button
              className="w-full"
              type="button"
              onClick={verifyOtpHandler}
              disabled={verifyLoading || isOtpVerified}
            >
              {isOtpVerified
                ? "Verified"
                : verifyLoading
                  ? "Verifying..."
                  : "Verify OTP"}
            </Button>

            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <PasswordInput
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
              disabled={!isOtpVerified}
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
