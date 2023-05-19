import { NULL_DATA } from '../../errors/error-codes';
import BaseError from '../../errors/error-mockup';
import statusCodes from '../../errors/status-codes';
import db from '../../models';

class UserService {
   public findById = async (user_id: number): Promise<any> => {
      const user = await db.User.findOne({
         where: {
            id: user_id,
         },
         attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      });

      if (user === null) {
         throw new BaseError(
            NULL_DATA,
            statusCodes.NOT_FOUND.message,
            'User Not Found',
         );
      }

      return user;
   };
}

export default new UserService();
