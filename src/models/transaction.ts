'use strict';
import { Model } from 'sequelize';

interface TransactionAttributes {
   id: number;
   product_id: number;
   room_id: string;
   tax: number;
   negotiable?: boolean;
   status?: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
   class Transaction
      extends Model<TransactionAttributes>
      implements TransactionAttributes
   {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      public id!: number;
      public product_id!: number;
      public room_id!: string;
      public tax!: number;
      public negotiable?: boolean;
      public status?: string;
      static associate(models: any) {
         // define association here
      }
   }
   Transaction.init(
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
         },
         product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         room_id: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         tax: {
            type: DataTypes.DECIMAL,
            allowNull: false,
         },
         negotiable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
         },
         status: {
            type: DataTypes.ENUM(
               'JOIN',
               'DIBAYAR',
               'DIPROSES',
               'DIKIRIM',
               'SELESAI',
            ),
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
