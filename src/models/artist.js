'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Artist.hasMany(models.Song, { foreignKey: 'idArtist' });
    }
  }
  Artist.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    banner: DataTypes.STRING,
    role: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    isCeleb: DataTypes.STRING,
    slug: DataTypes.STRING,
    totalFollowers: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};