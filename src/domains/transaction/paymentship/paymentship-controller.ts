import { Request, Response } from 'express';
import paymentshipService from './paymentship-service';

class PaymentshipController {
   public createSnapTransaction = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      const transaction = await paymentshipService.createSnap(req.body);

      return res.status(200).json({
         code: 'PAYMENTSHIP_SUCCESS',
         status: 'OK',
         data: {
            transaction,
         },
      });
   };

   public webhooksPaymentship = (req: Request, res: Response): Response => {
      return res.send(req.body);
   };
}

export default new PaymentshipController();
