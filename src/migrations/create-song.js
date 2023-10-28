'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Songs', {
      id: { 
        type: Sequelize.STRING,
        primaryKey: true
      },
      id_user: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      total_like: {
        type: Sequelize.STRING
      },
      total_listen: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      key_source: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Songs');
  }
};