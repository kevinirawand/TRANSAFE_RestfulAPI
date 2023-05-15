import WebSocket from 'ws';
import ExpressApplication from '../../app';
import 'dotenv/config';
import { Server } from 'socket.io';

class ChatService {
   public app: ExpressApplication;

   constructor() {
      this.app = new ExpressApplication(process.env.PORT || 1337);
   }

   public runChatServer = () => {
      const server = this.app.start();
      const io: any = new Server(server, {});

      const connectedUser = new Set();

      io.on('connection', (socket: any) => {
         console.info('Connectted Success', socket.id);

         io.emit('connected-user', connectedUser.size);
         connectedUser.add(socket.id);

         socket.on('disconnect', () => {
            console.info('Disconnected', socket.id);
            connectedUser.delete(socket.id);
         });

         socket.on('message', (data: any) => {
            console.info(data);
            socket.broadcast.emit('message-receive', data);
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
