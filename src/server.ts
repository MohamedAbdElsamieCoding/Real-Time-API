console.log(
  `[Pre-Env] REDIS_URL from system: ${process.env.REDIS_URL || "undefined"}`,
);
console.log(
  `[Pre-Env] NODE_ENV from system: ${process.env.NODE_ENV || "undefined"}`,
);

import "dotenv/config";

console.log(`[Env] Environment: ${process.env.NODE_ENV || "development"}`);
console.log(`[Env] REDIS_URL: ${process.env.REDIS_URL || "undefined"}`);
import app from "./app.js";
import { connectDb } from "./config/db.js";
import http from "http";
import { Server } from "socket.io";
import { initSockets } from "./sockets/index.js";
import { connectRedis, pubClient, subClient } from "./config/redis.js";
import { createAdapter } from "@socket.io/redis-adapter";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
(async () => {
  await connectRedis();
  io.adapter(createAdapter(pubClient, subClient));
  initSockets(io);
})();

const startServer = async () => {
  await connectDb();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
