import { Server } from "socket.io";
import { Message } from "../models/message.model";

export function chatSocket(io: Server) {
  io.on("connection", (socket) => {
    socket.on("chat:join", (roomId: string) => {
      socket.join(roomId);
      console.log(`Socket ${socket.data.user.id} joined room ${roomId}`);
    });

    socket.on("chat:send", async (data) => {
      const { conversationId, content } = data;
      const userId = socket.data.user.id;
      try {
        const newMessage = await Message.create({
          userId: userId,
          content: content,
        });
        io.to(conversationId).emit("chat:received", {
          id: newMessage._id,
          content: newMessage.content,
          userId: newMessage.userId,
          createdAt: newMessage.createdAt,
        });
      } catch (error) {
        socket.emit("error", { message: "Failed to save message" });
      }
    });
  });
}
