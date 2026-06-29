import { prisma } from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/response";
import { signUpSchema } from "@/schemas/signUpSchema";
import { formatZodErrors } from "@/helpers/zod-error";
import { getRedis } from "@/lib/redis";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = signUpSchema.safeParse(body.data);

    if (!validation.success) {
      return errorResponse(
        "Validation failed",
        400,
        formatZodErrors(validation.error.issues)
      );
    }

    const name = validation.data.name;
    const email = validation.data.email.toLowerCase().trim();
    const password = validation.data.password;

    const redisClient = await getRedis();

    const isVerified = await redisClient.get(
      `${body.purpose}-verified:${email}`
    );

    if (!isVerified) {
      return errorResponse("Please verify your email first", 400);
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await redisClient.del(`${body.purpose}:verified:${email}`);

    return successResponse(
      { id: user.id, email: user.email },
      "User registered successfully",
      201
    );
  } catch (error) {
    console.error(error);

    return errorResponse(
      error instanceof Error ? error.message : "Error in registering user",
      500
    );
  }
}
