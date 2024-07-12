"use strict";
const net = require("net");

// creates the server that can be reached by clients
const server = net.createServer();

server.on("connection", (socket) => {
  console.log("new connection to server");
  socket.on("data", (data) => {
    console.log(data.toString("utf-8"));
  });
});

server.listen(3000, "127.0.0.1", () => {
  console.log("opened server on: ", server.address());
});
