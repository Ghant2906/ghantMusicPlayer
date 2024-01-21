import db from "../models/index"
import userService from "./userService"

let addToPlaylist = async (dataSong, tokenUser) => {
    try {
        let user = await userService.getUserByToken(tokenUser)
        let findPlaylist = await db.Playlist.findOne({
            where: { idUser: user.id }
        })
        if (findPlaylist) {
            let findSong = await db.PlaylistDetail.findOne({
                where: { idPlaylist: findPlaylist.idPlaylist, idSong: dataSong }
            })
            if (findSong) {
                return {
                    errCode: 1,
                    msg: 'The song is already in the playlist'
                }
            } else {
                await addToPlaylistDetail(findPlaylist.idPlaylist, dataSong)
                return {
                    errCode: 0,
                    msg: 'Added to playlist!'
                }
            }
        } else {
            let playlist = await db.Playlist.create({
                idUser: user.id
            })
            await addToPlaylistDetail(playlist.dataValues.idPlaylist, dataSong)
            return {
                errCode: 0,
                msg: 'Added to playlist!'
            }
        }
    } catch (error) {
        console.log(error)
    }
}


let addToPlaylistDetail = async (idPlaylist, idSong) => {
    try {
        await db.PlaylistDetail.create({
            idPlaylist: idPlaylist,
            idSong: idSong
        })
        return {
            errCode: 0,
            msg: 'Added to playlistDetail!'
        }
    } catch (error) {
        console.log(error)
    }
}

let getPlaylistByIdUser = async (idUser) => {
    try {
        let data = await db.Playlist.findAll({
            where: { idUser: idUser },
            attributes: [],
            include: [
                {
                    model: db.PlaylistDetail,
                    attributes: [],
                    include: [
                        {
                            model: db.Song,
                            attributes: ['name', 'source', 'keySource', 'thumbnail'],
                            include: [
                                {
                                    model: db.Artist,
                                    attributes: ['name']
                                }
                            ]
                        },
                    ],
                },
                {
                    model: db.User,
                    attributes: ['userName']
                }
            ],
            raw: true,
            nest: true
        })

        if(data.length == 0){
            return []
        }

        let listSong = [{ userName: data[0].User.userName }];
        data.forEach(playlist => {
            listSong.push(playlist.PlaylistDetails.Song)
        });
        return listSong
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addToPlaylist: addToPlaylist,
    getPlaylistByIdUser: getPlaylistByIdUser,
}