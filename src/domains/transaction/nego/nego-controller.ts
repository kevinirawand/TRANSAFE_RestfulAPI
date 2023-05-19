import { Request, Response } from 'express';

class NegoController {
   public negoTransaction = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      return res.send('NEGO HERE');
   };
}

export default new NegoController();
