import { Request, Response } from 'express';
import db from '../../models';

class TransactionController {
   public createTransaction = (req: Request, res: Response): Response => {
      const { nama_produk, harga, images, method, fee_responsibility } =
         req.body;

      const product = db.Product.create({
         name: nama_produk,
         price: harga,
         images: images,
      });

      const room = db.Room.create({});

      return res.send('CREATE TRANS HERE');
   };
}

export default new TransactionController();
