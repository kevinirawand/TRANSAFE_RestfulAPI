const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 1233 });

server.on('connection', (ws) => {
   console.info('New Client Connected');

   ws.on('message', (message) => {
      console.info(message);
      ws.send(`Your message : ${message}`);
   });
});