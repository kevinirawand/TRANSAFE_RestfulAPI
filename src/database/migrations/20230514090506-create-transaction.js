'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_product: {
        type: Sequelize.INTEGER
      },
      id_room: {
        type: Sequelize.INTEGER
      },
      fee_rates: {
        type: Sequelize.DECIMAL
      },
      method: {
        type: Sequelize.STRING
      },
      ref_to: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('PEMBELI_BELUM_MELAKUKAN_TRANSFER', 'PEMBELI_BERHASIL_TRANSFER', 'PENJUAL_TELAH_MENGIRIM_PRODUK', 'MENUNGGU_KONFIRMASI_SELESAI_PEMBELI', 'TRANSAKSI_TELAH_SELESAI')
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
    await queryInterface.dropTable('Transactions');
  }
};