import { formatZodErrors } from "@/helpers/zod-error";
import { prisma } from "@/lib/prisma";
import { getRedis } from "@/lib/redis";
import { errorResponse, successResponse } from "@/lib/response";
import {
  emailValidation,
  passwordValidationSchema,
} from "@/schemas/signUpSchema";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = body.data.email.toLowerCase().trim();
    const password = body.data.password;

    const purpose = body.purpose;

    if (purpose !== "forgot-password") {
      return errorResponse("Invalid purpose", 400);
    }

    const validation = emailValidation.safeParse(email);

    const passwordValidation = passwordValidationSchema.safeParse(password);

    if (!validation.success) {
      return errorResponse(
        "Invalid Email",
        400,
        formatZodErrors(validation.error.issues)
      );
    }

    if (!passwordValidation.success) {
      return errorResponse(
        "Invalid Password",
        400,
        formatZodErrors(passwordValidation.error.issues)
      );
    }

    const redisClient = await getRedis();

    const verified = await redisClient.get(`${body.purpose}-verified:${email}`);

    if (!verified) {
      return errorResponse("Please verify OTP first", 400);
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return errorResponse("User does not exist please Sign In", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });

    await redisClient.del(`${body.purpose}-verified:${email}`);

    return successResponse(
      { id: user.id, email: user.email },
      "User Password updated successfully",
      200
    );
  } catch (error) {
    console.error(error);

    return errorResponse(
      error instanceof Error ? error.message : "Error in updating user",
      500
    );
  }
}
