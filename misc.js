const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
   socket.join("anomynous_group");
   console.info("Server Connected");
   socket.ion('sendMsg', (msg) => {
      console.info("msg", msg);
      io.to("anomynoys_group").emit("sendMsgServer", { ...msg, type: "otherMsg" });
   });
});

const port = 3000;

httpServer.listen(port, () => {
   console.info(`Server running on port ${port}`);
});
