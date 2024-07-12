"use strict";
const net = require("net");

const connection = net.createConnection(
  { host: "127.0.0.1", port: 3000 },
  () => {
    console.log("connected to server");
  }
);
