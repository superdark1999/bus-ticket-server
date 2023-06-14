import express from "express";
import setup from "shared/lib/setup";
import routes from "./routes/payment";
import http from "http";
import { Server } from "socket.io";
const app = express();

const bootstrap = async () => {
  const { PORT } = setup(app, routes);

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  io.on("connection", (socket) => {
    console.log("a user connected");
  });
  app.set("socketio", io);
  server.listen(PORT, () =>
    console.log(`tripRoute service listening on port ${PORT}!`)
  );
};

bootstrap();
