import { Resend } from "resend";
import { getEnv } from "./env";

const resend = new Resend(getEnv("RESEND_API_KEY"));

export async function sendOtpEmail(email: string, otp: string) {
  await resend.emails.send({
    from: getEnv("EMAIL_FROM"),
    to: email,
    subject: "Your OTP Code",
    html: `<p>Your OTP is <strong>${otp}</strong></p>`,
  });
}
