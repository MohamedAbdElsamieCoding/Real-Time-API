import { Server } from "socket.io";

export function notificationSocket(io: Server) {
  io.on("connection", (socket) => {
    socket.on("notification:subscribe", () => {
      socket.join(`user:${socket.data.user.id}`);
      console.log(`User ${socket.data.user.id} subscribed to notification`);
    });
  });
}
