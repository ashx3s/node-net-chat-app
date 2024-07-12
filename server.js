"use strict";
const net = require("net");

// creates the server that can be reached by clients
const server = net.createServer();

// save all sockets in this list of clients
const clients = [];

server.on("connection", (socket) => {
  console.log("new connection to server");

  socket.on("data", (data) => {
    clients.map((s) => {
      s.write(data);
    });
  });
  clients.push(socket);
});

server.listen(3000, "127.0.0.1", () => {
  console.log("opened server on: ", server.address());
});
