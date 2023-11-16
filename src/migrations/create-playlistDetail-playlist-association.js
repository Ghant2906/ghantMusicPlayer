'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('PlaylistDetail', {
      fields: ['idPlaylist'],
      type: 'foreign key',
      name: 'fk_playlistDetail_playlist',
      references: {
        table: 'Playlist',
        field: 'idPlaylist',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('PlaylistDetail', {
      fields: ['idPlaylist'],
      type: 'foreign key',
      name: 'fk_playlistDetail_playlist',
      references: {
        table: 'Playlists',
        field: 'idPlaylist',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
};
