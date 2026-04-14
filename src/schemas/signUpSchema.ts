import * as z from "zod";

export const nameValidation = z
  .string()
  .trim()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username should not be more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

export const emailValidation = z.string().trim().email().toLowerCase();

export const signUpSchema = z.object({
  name: nameValidation,
  email: emailValidation,

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export type SignupInput = z.infer<typeof signUpSchema>;
