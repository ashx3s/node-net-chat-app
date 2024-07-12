"use strict";
const net = require("net");
const readLine = require("readline/promises");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = net.createConnection(
  { host: "127.0.0.1", port: 3000 },
  async () => {
    console.log("connected to server");
    const message = await rl.question("Enter a message: ");
    socket.write(message);
  }
);

// receiving back from server and then logging it
socket.on("data", (data) => {
  console.log(data.toString("utf-8"));
});
// fires when the stream is closed
socket.on("close", () => {
  console.log("close");
});

// this fires before close
socket.on("end", () => {
  console.log("connection was ended");
});
