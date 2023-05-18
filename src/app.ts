import express, { Application } from 'express';
import path from 'path';
import morgan from 'morgan';
import logger from './utils/logger.js';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import apicache from 'apicache';

import UserRoutes from './domains/user/user-routes.js';
import AuthRoute from './domains/auth/auth-route.js';
import errorHandler from './middlewares/error-handler-middleware.js';
import TransactionRoutes from './domains/transaction/transaction-route.js';
import ChatRoutes from './domains/chat/chat-route.js';

class ExpressApplication {
   private app: Application;

   constructor(private port: string | number) {
      this.app = express();
      this.port = port;
      this.app.use(express.json({ type: 'application/json' }));
      this.app.use(express.urlencoded({ extended: false }));

      //  __init__
      this.configureAssets();
      this.setupRoute();
      this.setupMiddlewares([
         errorHandler,
         express.json(),
         express.urlencoded(),
         apicache.middleware('5 minutes'),
      ]);
      this.setupLibrary([
         process.env.NODE_ENV === 'development' ? morgan('dev') : '',
         compression(),
         helmet(),
         cors(),
      ]);
   }

private setupMiddlewares(middlewaresArr: any[]): void {
      middlewaresArr.forEach((middleware) => {
         this.app.use(middleware);
      });
   }

   private setupRoute(): void {
      this.app.use('/api/v1/auth', AuthRoute);
      this.app.use('/api/v1/user', UserRoutes);
      this.app.use('/api/v1/transaction', TransactionRoutes);
      this.app.use('/api/v1/chat', ChatRoutes);
   }

   private configureAssets() {
      this.app.use(express.static(path.join(__dirname, '../public')));
   }

   private setupLibrary(libraries: any[]): void {
      libraries.forEach((library) => {
         this.app.use(library);
      });
   }

   public start() {
      return this.app.listen(this.port, () => {
         logger.info(`Application running on port ${this.port}`);
      });
   }
}

export default ExpressApplication;
