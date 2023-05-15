'use strict';
import { Model } from 'sequelize';

interface RoomAttributes {
   id: number;
   id_seller: number;
   id_buyer: number;
}
module.exports = (sequelize: any, DataTypes: any) => {
   class Room extends Model<RoomAttributes> implements RoomAttributes {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      id!: number;
      id_seller!: number;
      id_buyer!: number;
      static associate(models: any) {
         // define association here
      }
   }
   Room.init(
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
         },
         id_seller: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         id_buyer: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: 'Room',
         underscored: true,
      },
   );
   return Room;
};
