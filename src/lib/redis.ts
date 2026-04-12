import { createClient } from "redis";
import { getEnv } from "./env";

let redisClient: ReturnType<typeof createClient>;

export async function getRedis() {
  if (!redisClient) {
    redisClient = createClient({
      url: getEnv("REDIS_URL"),
    });

    redisClient.on("error", (err) => console.log("Redis Error", err));

    await redisClient.connect();
  }

  return redisClient;
}
