'use strict';
import { Model } from 'sequelize';

interface EvidenceAttributes {
   shipping_name: string;
   resi: string;
   desc: string;
   evidence_pict: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
   class Evidence
      extends Model<EvidenceAttributes>
      implements EvidenceAttributes
   {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      public shipping_name!: string;
      public resi!: string;
      public desc!: string;
      public evidence_pict!: string;
      static associate(models: any) {
         // define association here
      }
   }
   Evidence.init(
      {
         shipping_name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         resi: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         desc: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         evidence_pict: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: 'Evidence',
         underscored: true,
      },
   );
   return Evidence;
};
