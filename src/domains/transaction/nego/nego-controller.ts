import { Request, Response } from 'express';
import TransactionService from '../transaction-service';
import db from '../../../models';

class NegoController {
   public negoHandler = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      if (req.params.status === 'accept') {
         const transaction = await TransactionService.findById(
            parseInt(req.params.transaction_id || ''),
         );

         // return res.send(transaction);

         await db.Product.update(
            {
               price: parseInt(req.params.amount || ''),
            },
            {
               where: {
                  id: transaction.product.id,
               },
            },
         );

         return res.status(200).json({
            code: 'NEGO_ACCEPTED',
            status: 'OK',
            data: {
               message: 'Nego accepted by seller',
            },
         });
      }

      return res.status(200).json({
         code: 'NEGO_DECLINED',
         status: 'OK',
         data: {
            message: 'Nego declined by seller',
         },
      });
   };
}

export default new NegoController();
