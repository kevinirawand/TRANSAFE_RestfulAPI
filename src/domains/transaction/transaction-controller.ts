import { Request, Response } from 'express';
import db from '../../models';
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
}

export default new TransactionController();
