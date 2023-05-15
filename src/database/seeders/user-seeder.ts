import BaseSeeder from '../../base_claseses/base-seeder';

import db from '../../models';
import AuthUtils from '../../utils/auth-utils';

class UserSeeder extends BaseSeeder {
   protected model: any;

   constructor(data: any[]) {
      super(data, db.User);
   }
}

export default new UserSeeder([
   {
      username: 'Kevin Irawan D',
      password: async () => await AuthUtils.hash('1234'),
   },
   {
      username: 'Ahmad Tri P',
      password: async () => await AuthUtils.hash('1234'),
   },
   {
      username: 'Joko Rahmad',
      password: async () => await AuthUtils.hash('1234'),
   },
   {
      username: 'Budi Prapatan',
      password: async () => await AuthUtils.hash('1234'),
   },
   {
      username: 'Retno Tromol',
      password: async () => await AuthUtils.hash('1234'),
   },
   {
      username: 'Mul Swiwi',
      password: async () => await AuthUtils.hash('1234'),
   },
   {
      username: 'Surono Degleng',
      password: async () => await AuthUtils.hash('1234'),
   },
]);
