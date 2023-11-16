'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Songs', {
      id: { 
        type: Sequelize.STRING,
        primaryKey: true
      },
      idArtist: {
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
      totalLike: {
        type: Sequelize.STRING
      },
      totalListen: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      keySource: {
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
    },{
      collate: 'utf8_unicode_ci',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Songs');
  }
};