import app from "./app";
import "dotenv/config";
import { connectDb } from "./config/db";
import http from "http";
import { Server } from "socket.io";
import { initSockets } from "./sockets";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
initSockets(io);

const startServer = async () => {
  await connectDb();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
