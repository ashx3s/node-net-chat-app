"use strict";
const net = require("net");
const readLine = require("readline/promises");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, (error) => {
      if (error) {
        reject();
      } else {
        resolve();
      }
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, (error) => {
      if (error) {
        reject();
      } else {
        resolve();
      }
    });
  });
};

let id;

const socket = net.createConnection(
  { host: "127.0.0.1", port: 3000 },
  async () => {
    console.log("connected to server");

    const ask = async () => {
      const message = await rl.question("Enter a message: ");
      // only need vertical because this is TTY. -1 is 1 line up
      await moveCursor(0, -1).catch((error) =>
        console.error("error moving cursor", error)
      );
      // clear current line that cursor is in
      await clearLine(0).catch((error) => {
        console.error("error clearing line", error);
      });
      socket.write(`${id}-message-${message}`);
    };
    ask();

    // receiving back from server and then logging it
    socket.on("data", async (data) => {
      console.log();
      await moveCursor(0, -1);
      await clearLine(0);

      if (data.toString("utf-8").substring(0, 2) === "id") {
        // when getting an id
        id = data.toString("utf-8").substring(3);

        console.log(`Your id is ${id}\n`);
      } else {
        // when getting a message
        console.log(data.toString("utf-8"));
      }
      ask();
    });
  }
);

socket.on("end", () => {
  console.log("connection was ended");
});
