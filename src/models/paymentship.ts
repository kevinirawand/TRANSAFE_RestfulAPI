'use strict';
import { Model } from 'sequelize';

interface PaymentshipAttributes {
   id: number;
   transaction_id: number;
   amount: number;
   user_id: number;
   method: string;
   type: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
   class Paymentship
      extends Model<PaymentshipAttributes>
      implements PaymentshipAttributes
   {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      public id!: number;
      public transaction_id!: number;
      public amount!: number;
      public user_id!: number;
      public method!: string;
      public type!: string;
      static associate(models: any) {
         // define association here
      }
   }
   Paymentship.init(
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         transaction_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         method: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         type: {
            type: DataTypes.ENUM('in', 'out'),
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: 'Paymentship',
         underscored: true,
      },
   );
   return Paymentship;
};
