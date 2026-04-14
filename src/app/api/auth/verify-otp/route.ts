import { getRedis } from "@/lib/redis";
import { errorResponse, successResponse } from "@/lib/response";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { otp, email } = body;

    const redisClient = await getRedis();

    const storedOtp = await redisClient.get(`otp:${email}`);

    if (!storedOtp) {
      return errorResponse("OTP expired or not found", 400);
    }

    if (otp !== storedOtp) {
      return errorResponse("Invalid OTP", 400);
    }

    await redisClient.del(`otp:${email}`);

    await redisClient.set(`verified:${email}`, "true", { EX: 600 });

    return successResponse(
      null,
      "User verified successfully. Please proceed to signup",
      200
    );
  } catch (error: any) {
    console.error(error);

    return errorResponse(
      error?.message || "Error verifying user. Please try again later",
      500
    );
  }
}
