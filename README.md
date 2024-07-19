# README

This is my build of a tutorial in the Understanding Node.js: Core Concepts course.

## Implementation Features

- net module:
  - `createServer()`
  - on connection and data methods
- host multiple users
  - `createConnection()`
- take input and give output:
  - `readline.createInterface()`
- tty module:
  - improved command line text interface
    - clearLine
    - moveCursor
- Identify users logged in:
  - assign user ids on server
  - improved message rendering with user "> User id: message" format

## Javascript Features

- Async/await mixed with Promises
  - use new Promise to wrap around callback function
  - error handle with .catch() when calling method
  - async await to call Promise wrapper functions
