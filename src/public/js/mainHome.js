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
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
                let menuLogin = $('#menuLogin');
                $('#login__btn').hover(() => {
                    $('#menuLogin').css("display", 'block')
                }, () => {
                    $('#menuLogin').css("display", 'none')
                });

                menuLogin.find('a').hover(
                    function () {
                        $(this).css('background-color', '#ddd');
                    },
                    function () {
                        $(this).css('background-color', '');
                    }
                );
            },
            error: (error) => {
                console.error('Lỗi khi gọi API:', error);
            }
        });

        $('#logOut_btn').click( () => {
            delete_cookie('token')
        })
    }
})
