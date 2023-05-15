'use strict';
import { Model } from 'sequelize';

interface TransactionAttributes {
   id: number;
   id_product: number;
   id_room: number;
   fee_rate: number;
   method: string;
   ref_to: number;
   status: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
   class Transaction extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      id!: number;
      id_product!: number;
      id_room!: number;
      fee_rate!: number;
      method!: string;
      ref_to!: number;
      status?: string;
      static associate(models: any) {
         // define association here
      }
   }
   Transaction.init(
      {
         id_product: DataTypes.INTEGER,
         id_room: DataTypes.INTEGER,
         fee_rates: DataTypes.DECIMAL,
         method: DataTypes.STRING,
         ref_to: DataTypes.STRING,
         status: {
            type: DataTypes.ENUM(
               'PEMBELI_BELUM_MELAKUKAN_TRANSFER',
               'PEMBELI_BERHASIL_TRANSFER',
               'PENJUAL_TELAH_MENGIRIM_PRODUK',
               'MENUNGGU_KONFIRMASI_SELESAI_PEMBELI',
               'TRANSAKSI_TELAH_SELESAI',
            ),
            defaultValue: 'PEMBELI_BELUM_MELAKUKAN_TRANSFER',
         },
      },
      {
         sequelize,
         modelName: 'Transaction',
         underscored: true,
      },
   );
   return Transaction;
};
