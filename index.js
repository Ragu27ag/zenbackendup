import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import client from "./DB/db-client.js";
import datarouter from "./Routes/DataRoute.js";
import userrouter from "./Routes/userroute.js";

const app = express();
const port = 5000;
dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.SOCKET_CON,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Connected", socket.id);

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data);
  });

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user ${socket.id} joined room ${data}`);
  });

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
  });
});

app.use(express.json());
app.use(cors());

client.connect();

app.get("/health", (req, res) => {
  res.send({ msg: "backend up and running" });
});

app.use("/", datarouter);
app.use("/users", userrouter);

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
