import WebSocket from 'ws';
import ExpressApplication from '../../app';
import 'dotenv/config';
import { Server } from 'socket.io';
import express from 'express';

class ChatService {
   public app: any = express();

   public runServer = () => {
      const server = this.app.listen(1223, () => {
         console.info('Chat Server Running on port 1223');
      });
      const io: any = new Server(server, {});

      io.on('connection', (socket: any) => {
         socket.join('anonymous_group');
         console.info(socket.id);
         socket.on('sendMsg', (msg: any) => {
            console.info('msg', msg);
            io.to('anonymous_group').emit('sendMsgServer', msg);
         });
         socket.on('negotiate', (amount: any) => {
            console.info('nego', amount);
            io.to('anonymous_group').emit('nego', amount);
         });
      });
   };

   public runSocketServer = () => {
      const server = new WebSocket.Server({ port: 1233 });

      server.on('connection', (ws) => {
         console.info('New Client Connected');

         ws.on('message', (message) => {
            console.info(message);
            ws.send(`Your message : ${message}`);
         });
      });
   };
}

export default new ChatService();
