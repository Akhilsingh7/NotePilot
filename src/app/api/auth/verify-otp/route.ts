import { getRedis } from "@/lib/redis";
import { errorResponse, successResponse } from "@/lib/response";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = body.email?.toLowerCase().trim();
    const otp = body.otp;

    if (!email || !otp) {
      return errorResponse("Email and OTP are required", 400);
    }

    const redisClient = await getRedis();

    const storedOtp = await redisClient.get(`otp:${email}`);

    if (!storedOtp) {
      return errorResponse("OTP expired. Please request a new one", 400);
    }

    if (String(otp) !== String(storedOtp)) {
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
