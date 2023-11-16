$(document).ready(() => {
    "use strict";
    var searchBox = $('#search-box')
    var hintContainer = $('#hint-container')
    var hints = [];

    searchBox.on("keyup", () => {
        var inputValue = searchBox.val().toLowerCase()

        if (inputValue.length > 1) {
            $.ajax({
                type: "GET",
                url: "/api/search/" + inputValue,
                success: (result) => {
                    hints = result.listSearchSongs
                    displayHints(hints);
                },
                error: (err) => {
                    console.log("Lỗi: " + err.responseText);
                }
            })
        } else {
            hintContainer.css("display", "none");
        }
    });

    hintContainer.on("click", ".hint-item", () => {
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
                    'href': ''
                })
                .addClass('single-item__cover');
            var coverImage = $('<img>').attr('src', hint.thumbnail).attr('alt', '');
            var singleItemTitle = $('<div>').addClass('single-item__title hint-item');
            var titleHeading = $('<h4>').text(hint.name);
            var artistSpan = $('<span>').text(hint.nameArtist);

            // Append elements
            singleItemCover.append(coverImage);
            singleItemTitle.append(titleHeading, artistSpan);
            singleItem.append(singleItemCover, singleItemTitle);
            mainList.append(singleItem);
            col12.append(mainList);
            hintContainer.append(col12)
        });
        hintContainer.css("display", "block")
    }
})