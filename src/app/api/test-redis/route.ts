import { getRedis } from "@/lib/redis";

export async function GET() {
  const redis = await getRedis(); // ✅ safe

  await redis.set("test", "Hello");
  const value = await redis.get("test");

  return Response.json({ value });
}
