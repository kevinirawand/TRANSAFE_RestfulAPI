import { Request, Response } from 'express';
import TransactionService from './transaction-service';

class TransactionController {
   public createTransaction = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      const data = {
         category: req.body.category,
         name: req.body.name,
         desc: req.body.desc,
         price: req.body.price,
         negotiable: req.body.negotiable,
         images: req.body.images,
         tax: req.body.tax,
         seller_id: req.app.locals.user.userId,
      };

      // shipping_fee,
      // weight

      const transaction = await TransactionService.createTransaction(data);

      return res.status(200).json({
         code: 'SUCCESS_CREATE_TRANSACTION',
         status: 'OK',
         data: {
            transaction,
         },
      });
   };

   public getOneTransaction = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      const result = await TransactionService.findById(
         parseInt(req.params.transaction_id || '-1'),
      );

      return res.status(200).json({
         code: 'SUCCESS_GET_ONE_TRANSACTION',
         status: 'OK',
         data: {
            result,
         },
      });
   };

   public updateStatusTransaction = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      await TransactionService.updateStatus(
         parseInt(req.params.transaction_id || '-1'),
         req.body.status,
      );

      return res.status(200).json({
         code: 'SUCCESS_UPDATE_TRANSACTION',
         status: 'OK',
         data: {
            message: 'Update Transaction Success!',
         },
      });
   };

   public getRecentTransaction = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      const results = await TransactionService.getRecent(
         req.app.locals.user.userId,
      );

      return res.status(200).json({
         code: 'SUCCESS_GET_RECENT_TRANSACTION',
         status: 'OK',
         data: {
            results,
         },
      });
   };

   public joinTransaction = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      const result = await TransactionService.join(
         req.params.room_id || '',
         req.app.locals.user.userId,
      );

      return res.status(200).json({
         code: 'SUCCESS_JOIN_TRANSACTION',
         status: 'OK',
         data: {
            message: 'Success join transaction!',
         },
      });
   };

   public negoTransaction = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      return res.send('NEGO HERE');
   };

   public paymentshipTransaction = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      const result = await TransactionService.paymentship({
         transaction_id: req.params.transaction_id,
         amount: req.body.amount,
         user_id: req.app.locals.user.userId,
         method: req.body.method,
         type: req.body.type,
      });
      return res.status(200).json({
         code: 'SUCCESS_CREATE_PAYMENTSHIP',
         status: 'OK',
         data: {
            message: 'Paymentship successfuly!',
         },
      });
   };
}

export default new TransactionController();
