'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PlaylistDetail', {
      idPlaylistDetail: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      idPlaylist: {
        type: Sequelize.UUID,
      },
      idSong: {
        type: Sequelize.STRING(50),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      collate: 'utf8_unicode_ci',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PlaylistDetail');
  }
};