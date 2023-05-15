import BaseSeeder from '../../base_claseses/base-seeder';

import db from '../../models';

class RoomSeeder extends BaseSeeder {
   protected model: any;

   constructor(data: any[]) {
      super(data, db.Room);
   }
}

export default new RoomSeeder([
   {
      id_seller: 1,
      id_buyer: 2,
   },
   {
      id_seller: 2,
      id_buyer: 3,
   },
   {
      id_seller: 3,
      id_buyer: 4,
   },
   {
      id_seller: 4,
      id_buyer: 5,
   },
]);
