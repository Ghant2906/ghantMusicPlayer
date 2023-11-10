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

        $('#logOut_btn').click(() => {
            delete_cookie('token')
        })
    }

    var searchBox = $('#search-box')
    var hintContainer = $('#hint-container')
    var hints = [];

    searchBox.on("keyup", () => {
        var inputValue = searchBox.val().toLowerCase();

        if (inputValue.length > 1) {
            $.ajax({
                type: "GET",
                url: "/api/search/" + inputValue,
                success: (result) => {
                    hints = result.listSearchSongs
                    var filteredHints = hints
                        .map(obj => ({thumbnail: obj.thumbnail, source: obj.source, nameArtist: obj.artist.name, name: obj.name.toLowerCase() }))
                        .filter(item => item.name.includes(inputValue));
                    displayHints(filteredHints);
                },
                error: (err) => {
                    console.log("Lỗi: " + err.responseText);
                }
            })
        } else {
            hintContainer.css("display", "none");
        }
    });

    hintContainer.on("click", ".hint-item", function () {
        searchBox.val($(this).find('h4').text());
        hintContainer.css("display", "none");
    });

    let displayHints = (songs) => {
        hintContainer.empty();

        songs.forEach(hint => {
            var col12 = $('<div>').addClass('col-12');
            var mainList = $('<ul>').addClass('main__list');
            var singleItem = $('<li>').addClass('single-item');
            var singleItemCover = $('<a>')
                .attr({
                    'data-link': '',
                    'data-title': hint.name,
                    'data-artist': hint.nameArtist,
                    'data-img': hint.thumbnail,
                    'href': hint.source
                })
                .addClass('single-item__cover');
            var coverImage = $('<img>').attr('src', hint.thumbnail).attr('alt', '');
            var playIcon = $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">...</svg>');
            var heartIcon = $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">...</svg>');
            var singleItemTitle = $('<div>').addClass('single-item__title hint-item');
            var titleHeading = $('<h4>').text(hint.name);
            var artistSpan = $('<span>').text(hint.nameArtist);

            // Append elements
            singleItemCover.append(coverImage, playIcon, heartIcon);
            singleItemTitle.append(titleHeading, artistSpan);
            singleItem.append(singleItemCover, singleItemTitle);
            mainList.append(singleItem);
            col12.append(mainList);
            hintContainer.append(col12)
        });
        hintContainer.css("display", "block")
    }
})
