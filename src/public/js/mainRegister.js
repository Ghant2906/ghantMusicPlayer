$(document).ready(() => {
    "use strict";

    $("#register_btn").click(() => {
        // Lấy dữ liệu từ form (username và password)
        var userName = $("#userNameInput").val();
        var email = $("#emailInput").val();
        var password = $("#passwordInput").val();
        var confirmPass = $("#confirmPasswordInput").val()

        if (!userName || !email || !password || !confirmPass) {
            $("#msgErr").html("Miising input")
        } else if (password !== confirmPass) {
            $("#msgErr").html("Password mismatch")
        } else {
            $.ajax({
                type: "POST",
                url: "/api/register",
                data: {
                    email: email,
                    password: password,
                    userName: userName
                },
                success: (result) => {
                    if (result.errCode == 0) {
                        alert("Authentication email sent. Please verify to login!!!")
                        window.location.href = "/login";
                    } else {
                        $("#msgErr").html(result.msg)
                    }
                },
                error: function (err) {
                    console.log("Lỗi đăng ký: " + err.responseText);
                }
            });
        }
    });
})