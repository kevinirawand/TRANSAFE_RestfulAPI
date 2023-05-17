'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Users', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
         },
         name: {
            type: Sequelize.STRING
         },
         usename: {
            type: Sequelize.STRING
         },
         phone_number: {
            type: Sequelize.INTEGER
         },
         email: {
            type: Sequelize.STRING
         },
         password: {
            type: Sequelize.STRING
         },
         address: {
            type: Sequelize.STRING
         },
         balance: {
            type: Sequelize.DECIMAL
         },
         created_at: {
            allowNull: false,
            type: Sequelize.DATE
         },
         updated_at: {
            allowNull: false,
            type: Sequelize.DATE
         }
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('Users');
   }
};