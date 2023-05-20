import { Request, Response } from 'express';
import TransactionService from './transaction-service';
import BaseError from '../../errors/error-mockup';
import UserService from '../user/user-service';
import { INVALID_CREDENTIALS } from '../../errors/error-codes';
import statusCodes from '../../errors/status-codes';

class TransactionController {
   public createTransaction = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      const obj = JSON.parse(JSON.stringify({ ...req.files }));

      if (!obj.images) {
         return res.status(400).json({
            code: INVALID_CREDENTIALS,
            status: statusCodes.BAD_REQUEST.message,
            errors: {
               images: ['product image is required'],
            },
         });
      }

      const data = {
         category: req.body.category,
         name: req.body.name,
         desc: req.body.desc,
         price: 5000000,
         negotiable: false,
         images: obj.images[0].path.toString(),
         tax: 10000,
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
      await TransactionService.join(
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

   public processTransaction = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      const transaction = await TransactionService.findById(
         parseInt(req.params.transaction_id || ''),
      );

      const buyerDetail = await UserService.findById(transaction.room.buyer_id);

      return res.status(200).json({
         code: 'TRANSACTION_PROCESSED',
         status: 'OK',
         data: {
            buyerDetail,
         },
      });
   };

   public transactionConfirmation = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      const obj = JSON.parse(JSON.stringify({ ...req.files }));

      if (!obj.evidence_pict) {
         return res.status(400).json({
            code: INVALID_CREDENTIALS,
            status: statusCodes.BAD_REQUEST.message,
            errors: {
               evidence_pict: ['evidence_pict is required'],
            },
         });
      }

      const data = {
         shipping_name: req.body.shipping_name,
         resi: req.body.resi,
         desc: req.body.desc,
         evidence_pict: obj.evidence_pict[0].path.toString(),
      };

      await TransactionService.confirmation(data);

      return res.status(200).json({
         code: 'TRANSACTION_PROCESSED',
         status: 'OK',
         data: {
            message: 'Transaction Confirmed!',
         },
      });
   };
}

export default new TransactionController();
