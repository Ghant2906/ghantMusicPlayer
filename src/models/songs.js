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
      // define association here
    }
  }
  Song.init({
    id:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    id_user: DataTypes.STRING,
    name: DataTypes.STRING,
    duration: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    source: DataTypes.STRING,
    total_like: DataTypes.STRING,
    total_listen: DataTypes.STRING,
    status: DataTypes.STRING,
    slug: DataTypes.STRING,
    key_source: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};