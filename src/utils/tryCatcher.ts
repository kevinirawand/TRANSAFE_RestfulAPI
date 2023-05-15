import { Request, Response, NextFunction } from 'express';

const tryCatch =
   (controller: any) =>
   async (
      req: Request,
      res: Response,
      next: NextFunction,
   ): Promise<any | Response> => {
      req.body.test = 'test from try catch';
      try {
         await controller(req, res);
      } catch (err) {
         next(err);
      }
   };

export default tryCatch;
