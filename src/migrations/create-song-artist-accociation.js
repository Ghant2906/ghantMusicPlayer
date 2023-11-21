'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Songs', {
        fields: ['idArtist'],
        type: 'foreign key',
        name: 'fk_song_artist',
        references: {
          table: 'Artists',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Song', {
        fields: ['idArtist'],
        type: 'foreign key',
        name: 'fk_song_artist',
        references: {
          table: 'Artists',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
  }
};
