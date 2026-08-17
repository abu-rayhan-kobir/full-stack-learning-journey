const express = require("express");
const {createServer} = require("node:http");
const {Server} = require("socket.io");
const app = express();

app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
const server = createServer(app);
const socket = new Server(server);

app.get("/", (request, response) => {
  console.log(`From: ${request.host}`);
  return response.sendFile("index.html");
});

socket.on("connection", (socket) => {
  console.log(`Client: ${socket.id}`);
  socket.on("message", (message) => {
    console.log(message);
    socket.emit("message", message);
  });
});


server.listen(PORT, () => {
  console.log(`Server started on: http://localhost:${PORT}`);
});