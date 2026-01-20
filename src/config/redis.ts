import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL,
});

export const pubClient = redis.duplicate();
export const subClient = redis.duplicate();

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.log(`Redis error: ${err}`);
});

export const connectRedis = async () => {
  if (!redis.isOpen) {
    await Promise.all([
      redis.connect(),
      pubClient.connect(),
      subClient.connect(),
    ]);
  }
};
