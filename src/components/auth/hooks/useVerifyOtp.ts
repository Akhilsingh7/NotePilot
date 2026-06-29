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
    } catch (err) {
      console.log("error ", axios.isAxiosError(err) ? err.response?.data : err);
      setVerifyLoading(false);

      const status = axios.isAxiosError(err) ? err.response?.status : undefined;
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message
        : undefined;

      if (status === 400) {
        toast.error(message || "Something went wrong");
      } else {
        toast.error("Error verifying user. Please try again later");
      }
      console.log("error ", axios.isAxiosError(err) ? err.response?.data : err);
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
