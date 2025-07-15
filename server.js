const http = require("http");
const socketIo = require("socket.io");
const app = require("./app");

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

global.io = io;

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

server.listen(5000, () => console.log("Server running on port 5000"));
