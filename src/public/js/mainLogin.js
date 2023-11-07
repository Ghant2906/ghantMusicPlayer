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

    $("#login_btn").click(() => {
        // Lấy dữ liệu từ form (username và password)
        var email = $("#emailInput").val();
        var password = $("#passwordInput").val();

        if (!email || !password) {
            $("#msgErr").html("Miising input")
        } else {
            $.ajax({
                type: "POST",
                url: "/api/login",
                data: {
                    email: email,
                    password: password
                },
                success: (result) => {
                    if (result.token) {
                        setCookie('token', result.token, 1)
                        window.location.href = "/";
                    } else {
                        $("#msgErr").html(result.msg)
                    }
                },
                error: function (err) {
                    console.log("Lỗi đăng nhập: " + err.responseText);
                }
            });
        }
    });
})