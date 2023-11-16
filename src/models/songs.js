'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      Song.hasMany(models.PlaylistDetail, { foreignKey: 'id', targetKey: 'idSong' });
  }
  }
  Song.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    idArtist: {
      type: DataTypes.STRING,
    },
    name: DataTypes.STRING,
    duration: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    source: DataTypes.STRING,
    totalLike: DataTypes.STRING,
    totalListen: DataTypes.STRING,
    status: DataTypes.STRING,
    slug: DataTypes.STRING,
    keySource: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};