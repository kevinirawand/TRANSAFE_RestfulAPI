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

      /**
       * COMMENT THIS TO TEST WITH REST CLIENT
       */
      if (!obj.images) {
         return res.status(400).json({
            code: INVALID_CREDENTIALS,
            status: statusCodes.BAD_REQUEST.message,
            errors: {
               images: ['product image is required'],
            },
         });
      }

      /**
       * COMMENT THIS TO TEST WITH REST CLIENT
       */
      const data = {
         category: req.body.category,
         name: req.body.name,
         desc: req.body.desc,
         price: parseInt(req.body.price),
         negotiable: req.body.negotiable,
         images: obj.images[0].path.toString(),
         tax: req.body.tax,
         seller_id: req.app.locals.user.userId,
      };

      /**
       * USE THIS TO TEST WITH REST CLIENT
       */
      // const data = {
      //    category: req.body.category,
      //    name: req.body.name,
      //    desc: req.body.desc,
      //    price: parseInt(req.body.price),
      //    negotiable: req.body.negotiable,
      //    images: req.body.images,
      //    tax: req.body.tax,
      //    seller_id: req.app.locals.user.userId,
      // };

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
         req.params.transaction_id || '',
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
         req.params.transaction_id || '',
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
      console.info(req.app.locals.user);

      const data = await TransactionService.join(
         req.params.room_id || '',
         req.app.locals.user.userId,
      );

      return res.status(200).json({
         code: 'SUCCESS_GET_ROOM',
         status: 'OK',
         data: {
            data,
         },
      });
   };

   public joinConfirmation = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      await TransactionService.confirmJoin(
         req.app.locals.user.userId,
         req.params.room_id || '',
      );

      return res.status(200).json({
         code: 'SUCCESS_JOIN_TRANSACTION',
         status: 'OK',
         data: {
            message: 'Buyer join this room!',
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
         req.params.transaction_id || '',
      );

      const buyerDetail = await UserService.findById(transaction.room.buyer_id);

      TransactionService.updateStatus(
         req.params.transaction_id || '',
         'DIPROSES',
      );

      return res.status(200).json({
         code: 'TRANSACTION_PROCESSED',
         status: 'OK',
         data: {
            transaction,
            buyerDetail,
         },
      });
   };

   public sendOrderTransaction = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      const obj = JSON.parse(JSON.stringify({ ...req.files }));

      /**COMMENT THIS TO TEST VIA REST CLIENT */
      // if (!obj.evidence_pict) {
      //    return res.status(400).json({
      //       code: INVALID_CREDENTIALS,
      //       status: statusCodes.BAD_REQUEST.message,
      //       errors: {
      //          evidence_pict: ['evidence_pict is required'],
      //       },
      //    });
      // }

      /**COMMENT THIS TO TEST VIA REST CLIENT */
      // const data = {
      //    shipping_name: req.body.shipping_name,
      //    resi: req.body.resi,
      //    desc: req.body.desc,
      //    evidence_pict: obj.evidence_pict[0].path.toString(),
      // };

      /**ACTIVED THIS COMMENT AND COMMENT DATA ABOVE TO TEST VIA REST CLIENT */
      const data = {
         shipping_name: req.body.shipping_name,
         resi: req.body.resi,
         desc: req.body.desc,
         evidence_pict: req.body.evidence_pict,
         transaction_id: req.params.transaction_id,
      };

      const transactionWithEvidence = await TransactionService.sendOrder(data);

      return res.status(200).json({
         code: 'TRANSACTION_PROCESSED',
         status: 'OK',
         data: {
            transactionWithEvidence,
         },
      });
   };
}

export default new TransactionController();
