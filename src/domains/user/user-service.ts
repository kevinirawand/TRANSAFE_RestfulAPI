import db from '../../models';

class UserService {
   public findById = async (user_id: number): Promise<any> => {
      const user = await db.User.findOne({
         where: {
            id: user_id,
         },
      });

      return user;
   };
}

export default new UserService();
