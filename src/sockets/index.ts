import { Server } from "socket.io";
import { registerChatHandlers } from "./chat.socket.js";
import { registerNotificationHandlers } from "./notification.socket.js";
import { socketAuth } from "../middlewares/socket-auth.js";
import { redis } from "../config/redis.js";

export const initSockets = (io: Server) => {
  socketAuth(io);

  io.on("connection", async (socket) => {
    const userId = socket.data.user.id;

    await redis.sAdd("online_users", userId);
    console.log(`User ${userId} is now online`);
    io.emit("user:online", { userId });

    socket.on("disconnect", async () => {
      // Check if user has other active connections
      const sockets = await io.in(userId).fetchSockets();
      if (sockets.length === 0) {
        await redis.sRem("online_users", userId);
        console.log(`User ${userId} is now offline`);
        io.emit("user:offline", { userId });
      }
    });

    const onlineList = await redis.sMembers("online_users");
    socket.emit("user:list", onlineList);

    registerChatHandlers(io, socket);
    registerNotificationHandlers(io, socket);
  });
};
