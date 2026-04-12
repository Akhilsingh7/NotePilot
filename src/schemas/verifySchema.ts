import * as z from "zod";

export const verifyOtpSchema = z.object({
  code: z
    .string()
    .trim()
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^[0-9]+$/, "OTP must contain only numbers"),
});
