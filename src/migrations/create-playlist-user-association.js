'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Playlist', {
      fields: ['idUser'],
      type: 'foreign key',
      name: 'fk_playlists_user',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Playlist', {
      fields: ['idUser'],
      type: 'foreign key',
      name: 'fk_playlists_user',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
};
