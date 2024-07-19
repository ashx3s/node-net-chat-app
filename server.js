"use strict";
const net = require("net");

// creates the server that can be reached by clients
const server = net.createServer();

// save all sockets in this list of clients
const clients = [];

server.on("connection", (socket) => {
  console.log("new connection to server");

  const clientId = clients.length + 1;
  socket.write(`id-${clientId}`);

  socket.on("data", (data) => {
    const dataString = data.toString("utf-8");
    const id = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message-") + 9);
    clients.map((client) => {
      client.socket.write(`> User ${id}: ${message}`);
    });
  });

  clients.push({ id: clientId.toString(), socket });
});

server.listen(3000, "127.0.0.1", () => {
  console.log("opened server on: ", server.address());
});
