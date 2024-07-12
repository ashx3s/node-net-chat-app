"use strict";
const net = require("net");

// creates the server that can be reached by clients
const server = net.createServer();

server.on("connection", (socket) => {
  console.log("new connection to server")
})

server.listen(3000, "127.0.0.1", () => {
  console.log("opened server on: ", server.address())
})