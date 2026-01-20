import { Server } from "socket.io";
import { verifyAccessToken } from "../utils/jwt.js";

export const socketAuth = (io: Server) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication error"));

    try {
      const decoded = verifyAccessToken(token);
      if (!decoded) {
        return next(new Error("Authentication error"));
      }

      socket.data.user = decoded;
      next();
    } catch (error) {
      next(new Error("Authentication error"));
    }
  });
};
