import { formatZodErrors } from "@/helpers/zod-error";
import { sendOtpEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { getRedis } from "@/lib/redis";
import { errorResponse, successResponse } from "@/lib/response";
import { emailValidation } from "@/schemas/signUpSchema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = body.email.toLowerCase().trim();

    const emailSchemaVerify = emailValidation.safeParse(email);

    if (!emailSchemaVerify.success) {
      return errorResponse(
        "Please enter valid email",
        400,
        emailSchemaVerify.error.issues
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return errorResponse("User already exists. Please login", 400);
    }

    const redisClient = await getRedis();

    const existingOtp = await redisClient.get(`otp:${email}`);

    if (existingOtp) {
      return errorResponse("OTP already sent. Please wait 5 minutes", 429);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await redisClient.set(`otp:${email}`, otp, { EX: 300 });

    await redisClient.del(`verified:${email}`);

    try {
      await sendOtpEmail(email, otp);
    } catch {
      await redisClient.del(`otp:${email}`);
      return errorResponse("Failed to send OTP. Please try again", 500);
    }

    return successResponse(null, "OTP sent successfully", 200);
  } catch (error: any) {
    console.error(error);

    return errorResponse(error?.message || "Failed to send OTP", 500);
  }
}
