import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient>;

export async function getRedis() {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL,
    });

    redisClient.on("error", (err) => console.log("Redis Error", err));

    await redisClient.connect();
  }

  return redisClient;
}
