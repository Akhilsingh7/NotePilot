import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export function useVerifyOtp() {
  const [verifyLoading, setVerifyLoading] = useState(false);
  const verifyOtp = async (email: string, otp: string, purpose: string) => {
    try {
      setVerifyLoading(true);
      const res = await axios.post("/api/auth/verify-otp", {
        purpose,
        data: {
          email: email,
          otp: otp,
        },
      });
      console.log("response", res.data);

      if (res?.data?.success) {
        toast.success("User verified Successfully");
        return true;
      }
      return false;
    } catch (err: any) {
      console.log("error ", err.response.data);
      setVerifyLoading(false);

      const status = err?.response?.status;
      const message = err?.response?.data?.message;

      if (status === 400) {
        toast.error(message || "Something went wrong");
      } else {
        toast.error("Error verifying user. Please try again later");
      }
      console.log("error ", err.response.data);
      return false;
    } finally {
      setVerifyLoading(false);
    }
  };
  return {
    verifyOtp,
    verifyLoading,
  };
}
