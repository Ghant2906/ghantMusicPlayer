function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function delete_cookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

$(document).ready(() => {
    "use strict";

    $('.addToPlaylistBtn').click(function () {
        let idSong = $(this).data('idsong');
        if (!getCookie('token')) {
            alert("Plz login")
        } else {
            $.ajax({
                url: '/api/addSongToPlaylist',
                type: 'Post',
                data: {
                    idSong: idSong
                },
                success: (data) => {
                    alert(data.msg)
                },
                error: (error) => {
                    console.error('Lỗi khi gọi API:', error);
                }
            })
        }
    });
})
