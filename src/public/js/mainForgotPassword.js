$(document).ready(()=>{
    "use strict";

    $("#send_btn").click(() => {
        if($('#emailInput').val() == ''){
            $('#msgErr').html('please enter gmail verify!')
        }else{
            let email = $('#emailInput').val()
            $.ajax({
                type: "POST",
                url: "/api/sendMailVerify",
                data: {
                    email: email
                },
                success: (result) => {
                    if (result.errCode == 0) {
                        $("#msgErr").html(result.msg)
                        $("#msgErr").css('color', 'green')
                    } else {
                        $("#msgErr").html(result.msg)
                    }
                },
                error: (err) => {
                    console.log("Lỗi: " + err);
                }
            })
        }
    })
})