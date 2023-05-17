import { INVALID_DATABASE_PROCESS } from '../../errors/error-codes';
import BaseError from '../../errors/error-mockup';
import db from '../../models';
import statusCodes from '../../errors/status-codes';

class TransactionService {
   public createTransaction = async (data: any): Promise<any> => {
      try {
         const result = await db.sequelize.transaction(
            async (transactionData: any) => {
               const product = await db.Product.create(
                  {
                     name: data.name,
                     price: data.price,
                     category: data.category,
                     desc: data.desc,
                     images: data.images,
                  },
                  {
                     transaction: transactionData,
                  },
               );

               const room = await db.Room.create(
                  {
                     seller_id: data.seller_id,
                  },
                  {
                     transaction: transactionData,
                  },
               );

               const transaction = await db.Transaction.create(
                  {
                     product_id: product.id,
                     room_id: room.id,
                     tax: data.tax,
                     negotiable: data.negotiable,
                  },
                  {
                     transaction: transactionData,
                  },
               );

               return transaction.dataValues;
            },
         );

         const results = await db.Transaction.findOne({
            where: {
               id: result.id,
            },
            include: [
               { model: db.Product, as: 'product' },
               { model: db.Room, as: 'room' },
            ],
            attributes: { exclude: ['ProductId', 'RoomId'] },
         });

         return results;
      } catch (error: any) {
         throw new BaseError(
            INVALID_DATABASE_PROCESS,
            statusCodes.BAD_REQUEST.message,
            error.message.toString(),
         );
      }
   };
}

export default new TransactionService();
