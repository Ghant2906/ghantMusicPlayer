const dataLogin = {}

$(document).ready(()=>{
    "use strict";



    $("#login_btn").click(() => {
        // Lấy dữ liệu từ form (username và password)
        var email = $("#emailInput").val();
        var password = $("#passwordInput").val();
    
        // Gọi đến API login thông qua AJAX
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: {
                email: email,
                password: password
            },
            success: (data) => {
                if(data.user){
                    dataLogin = data
                    window.location.href = "/";
                }else{
                    console.log(data.msg)
                }
            },
            error: function (err) {
                console.log("Lỗi đăng nhập: " + err.responseText);
            }
        });
    });
})

module.exports = dataLogin