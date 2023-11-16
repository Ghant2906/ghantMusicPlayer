'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Playlist extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Define associations here
            Playlist.belongsTo(models.User, { foreignKey: 'idUser', targetKey: 'id' });
            Playlist.hasMany(models.PlaylistDetail, { foreignKey: 'idPlaylist', targetKey: 'idPlaylist' });
        }
    }
    Playlist.init({
        idPlaylist: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        idUser: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Playlist',
    });
    return Playlist;
};