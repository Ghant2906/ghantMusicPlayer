'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('PlaylistDetail', {
        fields: ['idSong'],
        type: 'foreign key',
        name: 'fk_playlistDetail_song',
        references: {
          table: 'Songs',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('PlaylistDetail', {
      fields: ['idSong'],
      type: 'foreign key',
      name: 'fk_playlistDetail_song',
      references: {
        table: 'Songs',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
};
