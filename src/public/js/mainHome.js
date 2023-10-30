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

$(document).ready(() => {
    "use strict";

    let token = getCookie('token')

    if (token) {
        $.ajax({
            url: '/api/getUser/' + token,
            type: 'GET',
            success: (data) => {
                $('#login__svg').hide()
                $('#login__span').html(data.userName)
            },
            error: (error) => {
                console.error('Lỗi khi gọi API:', error);
            }
        });
    }

    fetch('/api/getTopSongs')
        .then(response => response.json())
        .then(data => {
            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
})