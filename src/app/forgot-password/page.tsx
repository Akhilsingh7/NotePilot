"use client";

import { useSendOtp } from "@/components/auth/hooks/useSendOtp";
import { useVerifyOtp } from "@/components/auth/hooks/useVerifyOtp";
import PasswordInput from "@/components/common/PasswordInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [openSignin, setOpenSignin] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { sendOtp, cooldown, sendLoading } = useSendOtp();

  const { verifyOtp, verifyLoading } = useVerifyOtp();

  const verifyOtpHandler = async () => {
    const success = await verifyOtp(email, otp, "forgot-password");

    if (success) {
      setOtp("");
      setOtpVerified(true);
    }
  };

  const resetPasswordHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/forgot-password", {
        purpose: "forgot-password",
        data: {
          email,
          password,
        },
      });

      console.log("Password Updated", res.data);

      if (res.data.success) {
        toast.success("Password Updated Succescfully");
        setEmail("");
        setPassword("");
        router.push("/");
      }
    } catch (error) {
      console.log("Error in updating password", error);
      toast.error("Error , Please try again Later");
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-muted/30 flex items-center justify-center px-4 pt-10">
      <Card className="w-full max-w-md shadow-lg mx-4">
        <CardHeader className="space-y-3 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Forgot Password</h1>

          <p className="text-sm text-muted-foreground">
            Enter your email address and we&apos;ll send you an OTP to reset your
            password.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <Input
              type="text"
              placeholder="Enter your email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={cooldown > 0 || otpVerified}
            />
          </div>

          {/* OTP */}

          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={otpVerified}
              className="sm:flex-1"
            />
            <Button
              variant="outline"
              type="button"
              onClick={() => sendOtp(email, "forgot-password")}
              disabled={sendLoading || verifyLoading || cooldown > 0}
              className="shrink-0"
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Send OTP"}
            </Button>
          </div>
          {!otpVerified && (
            <Button
              className="w-full"
              type="button"
              onClick={verifyOtpHandler}
              disabled={verifyLoading}
            >
              <span>Verify OTP</span>
            </Button>
          )}

          {/* New Password */}
          {/* className={`${otpVerified ? " flex" : " hidden"}`} */}
          {otpVerified && (
            <div className="flex flex-col gap-2">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>

                <PasswordInput
                  id="password"
                  placeholder="Enter new password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                className="w-full"
                onClick={resetPasswordHandler}
                disabled={loading}
              >
                Reset Password
              </Button>
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/" className="font-medium text-primary hover:underline">
              Back to Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
      {/* <SigninModal open={openSignin} onOpenChange={setOpenSignin} /> */}
    </main>
  );
}
