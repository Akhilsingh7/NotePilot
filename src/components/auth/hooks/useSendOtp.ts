import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useSendOtp() {
  const [cooldown, setCooldown] = useState(0);
  const [sendLoading, setSendLoading] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);
  const sendOtp = async (email: string, purpose: string) => {
    setSendLoading(true);
    try {
      const res = await axios.post("/api/auth/send-otp", {
        purpose,
        data: {
          email: email,
        },
      });
      console.log("send-details-for-otp", res.data);
      if (res.data.success) {
        toast.success("Otp Send Successuffuly");
        setCooldown(60);
      }
    } catch (err: any) {
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
    } finally {
      setSendLoading(false);
    }
  };

  return {
    sendOtp,
    cooldown,
    sendLoading,
  };
}
