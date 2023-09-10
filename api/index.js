import express from "express";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("connection", socket.id);

  socket.on("announcement", (message) => {
    socket.broadcast.emit("receiveAnnouncement", message); //? send to all except sender
  });

  socket.on("sendMessage", (message, room) => {
    console.log(message);
    socket.to(room).emit("receiveMessage", message); //? send to a specific room (room can be a single user or a group chat with multiple users joined) except sender
  });

  socket.on("joinGroup", (room) => {
    console.log(`${socket.id} joined room ${room}}`);
    socket.join(room);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "App running",
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
