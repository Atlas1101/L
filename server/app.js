import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

//env
import dotenv from "dotenv";
//routes
import organizationsRoutes from "./routes/organizationsRoutes.js";
import commentsRoutes from "./routes/commentsRoute.js";
import eventsRoutes from "./routes/eventsRoutes.js";
import usersRoutes from "./routes/usersRoute.js";

//socket
import { setupSocket } from "./utils/socket.js";

const app = express();
const PORT = 3000;
dotenv.config();
app.use(express.json());
app.use(morgan("tiny"));
// app.use(logRequest);
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's origin
    credentials: true, // Enable credentials (cookies, etc.)
  })
);
app.use(cookieParser());

//connect mongo
const uri = process.env.DB_URI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:" + `${uri}`, err.message);
  });

//check if the server work
app.get("/api/status", (req, res) => {
  res.send({ status: "server is running" });
});

//use organization
app.use("/api/organizations", organizationsRoutes);

//use events
app.use("/api/events", eventsRoutes);

//use users
app.use("/api/users", usersRoutes);

//use comments
app.use("/api/comments", commentsRoutes);

// socket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5175",
    credentials: true,
  },
});
//imp socket file
setupSocket(io);

//
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
