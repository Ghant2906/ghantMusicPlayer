'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Playlist, { foreignKey: 'idUser', targetKey: 'id' });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    tokenExpires: DataTypes.DATE,
    idGG: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  // sequelize.getQueryInterface().addColumn('Users', 'token', {
  //     type: DataTypes.STRING,
  // });

  // sequelize.getQueryInterface().addColumn('Users', 'tokenExpires', {
  //   type: DataTypes.DATE,
  // });

  return User;
};