'use strict';
import { Model } from 'sequelize';

interface UserAttributes {
   id: number;
   username: string;
   password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
   class User extends Model<UserAttributes> implements UserAttributes {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      id!: number;
      username!: string;
      password!: string;
      static associate(models: any) {
         // define association here
      }
   }
   User.init(
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
         },
         username: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         password: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: 'User',
         underscored: true,
      },
   );
   return User;
};
