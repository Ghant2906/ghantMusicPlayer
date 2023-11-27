$(document).ready(() => {
    "use strict";

    const currentURL = window.location.href;
    const lastSlashIndex = currentURL.lastIndexOf('/');
    const token = currentURL.substring(lastSlashIndex + 1);

    $.ajax({
        type: "GET",
        url: `/api/getUserByTokenReset/${token}`,
        success: (result) => {
            if (result.errCode == 0) {
                $('#emailInput').val(result.email)
            } else {
                $('#msgErr').html(result.msg)
            }
        },
        error: function (err) {
            console.log("Lỗi: " + err.responseText);
        }
    })

    $('#submit_btn').click(() => {
        if ($('#newPasswordInput').val() == '' || $('#comfirmNewPasswordInput').val() == '') {
            $('#msgErr').html('Missing required parameters')
        } else if ($('#newPasswordInput').val() != $('#comfirmNewPasswordInput').val()) {
            $('#msgErr').html('Confirm the new password does not match the new password')
        } else {
            let newPass = $('#newPasswordInput').val()
            let email = $('#emailInput').val()
            $.ajax({
                type: "POST",
                url: '/api/resetPassword',
                data: {
                    email: email,
                    newPass: newPass
                },
                success: (result) => {
                    alert(result.msg)
                    window.location.href = '/login'
                },
                error: function (err) {
                    console.log("Lỗi: " + err.responseText);
                }
            })
        }

    })
})