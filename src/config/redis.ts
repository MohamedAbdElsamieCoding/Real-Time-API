import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
console.log(`Connecting to Redis at: ${redisUrl}`);

export const redis = createClient({
  url: redisUrl,
});

export const pubClient = redis.duplicate();
export const subClient = redis.duplicate();

redis.on("connect", () => {
  console.log(`Redis client connected to ${redisUrl}`);
});

redis.on("error", (err) => {
  console.log(`Redis error: ${err}`);
});

export const connectRedis = async () => {
  try {
    if (!redis.isOpen) {
      await Promise.all([
        redis.connect(),
        pubClient.connect(),
        subClient.connect(),
      ]);
    }
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
    process.exit(1);
  }
};
