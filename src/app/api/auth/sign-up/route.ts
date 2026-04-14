import { prisma } from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/response";
import { signUpSchema } from "@/schemas/signUpSchema";
import { formatZodErrors } from "@/helpers/zod-error";
import { getRedis } from "@/lib/redis";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = signUpSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        "Validation failed",
        400,
        formatZodErrors(validation.error.issues)
      );
    }

    const name = body.name;
    const email = body.email.toLowerCase().trim();
    const password = body.password;

    const redisClient = await getRedis();

    const isVerified = await redisClient.get(`verified:${email}`);

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

    await redisClient.del(`verified:${email}`);

    return successResponse(
      { id: user.id, email: user.email },
      "User registered successfully",
      201
    );
  } catch (error: any) {
    console.error(error);

    return errorResponse(error?.message || "Error in registering user", 500);
  }
}
