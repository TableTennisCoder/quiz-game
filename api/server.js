import cors from "cors";
import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";

// Routes
import authRouter from "./routes/authRoutes.js";
import questionsRoutes from "./routes/questionsRoutes.js";
import answersRoutes from "./routes/answersRoutes.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/api", authRouter);
app.use("/api", questionsRoutes);
app.use("/api", answersRoutes);

// Socket.io
const users = [];

io.on("connection", (socket) => {
  users.push({userId: socket.id});
  io.emit("receive-users", users);

  socket.on("disconnect", () => {
    // search for the index of the disconnected player
    const index = users.findIndex((user) => user.userId === socket.id);
    // if a user was found, index = index of disconnected user, otherwise it's -1
    if (index !== -1) {
      // remove the object from array at the given index
      users.splice(index, 1);
      io.emit("receive-users", users);
    }
  });
});
server.listen(8800, () => {
  console.log("API working");
});
