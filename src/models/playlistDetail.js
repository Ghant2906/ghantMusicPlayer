'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PlaylistDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Define associations here
            PlaylistDetail.belongsTo(models.Song, { foreignKey: 'idSong'});
            PlaylistDetail.belongsTo(models.Playlist, { foreignKey: 'idPlaylist'});
        }
    }
    PlaylistDetail.init({
        idPlaylistDetail: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        idPlaylist: {
            type: DataTypes.STRING,
        },
        idSong: {
            type: DataTypes.STRING(50)
        },
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'PlaylistDetail',
    });
    return PlaylistDetail;
};