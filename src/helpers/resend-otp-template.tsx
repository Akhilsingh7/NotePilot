import React from "react";

type OtpEmailProps = {
  otp: string;
};

export function OtpEmail({ otp }: OtpEmailProps) {
  return (
    <div>
      <h2>Your Verification Code</h2>
      <p>Your OTP is:</p>
      <h1>{otp}</h1>
      <p>This code will expire in 5 minutes.</p>
    </div>
  );
}
