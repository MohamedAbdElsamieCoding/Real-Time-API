import { Server } from "socket.io";
import { chatSocket } from "./chat.socket";
import { notificationSocket } from "./notification.socket";
import { socketAuth } from "../middlewares/socket-auth";

export const onlineUsers = new Map<string, number>();
export const initSockets = (io: Server) => {
  socketAuth(io);

  io.on("connection", (socket) => {
    const userId = socket.data.user.id;
    const currentCount = onlineUsers.get(userId) || 0;
    onlineUsers.set(userId, currentCount + 1);

    if (currentCount === 0) {
      console.log(`User ${userId} is now online`);
      io.emit("user:online", { userId });
    }

    socket.on("disconnect", () => {
      const count = onlineUsers.get(userId) || 0;
      if (count > 0) {
        onlineUsers.set(userId, count - 1);
      } else {
        onlineUsers.delete(userId);
        console.log(`User ${userId} is now offline`);
        io.emit("user:offline", { userId });
      }
    });
    socket.emit("user:list", Array.from(onlineUsers.keys()));
  });

  chatSocket(io);
  notificationSocket(io);
};
