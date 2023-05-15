import BaseSeeder from '../../base_claseses/base-seeder';

import db from '../../models';

class TransactionSeeder extends BaseSeeder {
   protected model: any;

   constructor(data: any[]) {
      super(data, db.Transaction);
   }
}

export default new TransactionSeeder([
   {
      id_product: 1,
      id_room: 1,
      fee_rates: 45500,
      method: 'gopay',
      ref_to: '6285159436455',
   },
   {
      id_product: 2,
      id_room: 2,
      fee_rates: 50000,
      method: 'ovo',
      ref_to: '6285159436455',
   },
   {
      id_product: 3,
      id_room: 3,
      fee_rates: 150000,
      method: 'shopeepay',
      ref_to: '6285159436455',
   },
   {
      id_product: 4,
      id_room: 4,
      fee_rates: 45500,
      method: 'bca',
      ref_to: '7732616272213',
   },
]);
