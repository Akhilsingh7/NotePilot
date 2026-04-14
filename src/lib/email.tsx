import { Resend } from "resend";
import { getEnv } from "./env";
import { OtpEmail } from "@/helpers/resend-otp-template";

const resend = new Resend(getEnv("RESEND_API_KEY"));

export async function sendOtpEmail(email: string, otp: string) {
  try {
    const response = await resend.emails.send({
      from: getEnv("EMAIL_FROM"),
      to: email,
      subject: "Your OTP Code",
      react: <OtpEmail otp={otp} />,
    });
    console.log("Resend success:", response);

    return response;
  } catch (err) {
    console.error("Resend error:", err);
    throw err;
  }
}
