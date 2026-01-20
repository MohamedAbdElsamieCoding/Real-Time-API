import { Server, Socket } from "socket.io";

export function registerNotificationHandlers(_io: Server, socket: Socket) {
  socket.on("notification:subscribe", () => {
    socket.join(`user:${socket.data.user.id}`);
    console.log(`User ${socket.data.user.id} subscribed to notification`);
  });
}
