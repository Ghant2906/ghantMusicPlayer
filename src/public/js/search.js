$(document).ready(() => {
    "use strict";
    var searchBox = $('#search-box')
    var hintContainer = $('#hint-container')
    var hints = [];
    var timeOut;

    searchBox.on("input", () => {
        if (timeOut) {
            clearTimeout(timeOut);
        }

        timeOut = setTimeout(() => {
            if (searchBox.val() == "") {
                hintContainer.css("display", "none");
            } else {
                var inputValue = searchBox.val().toLowerCase()
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
                hintContainer.empty();
                hintContainer.css("display", "block")
            }
        }, 1000)
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
    }

    $(document).on('click', (event) => {
        var isClickInsideInput = searchBox.is(event.target);
        if(!isClickInsideInput){
            hintContainer.css("display", "none")
        }else{
            if(searchBox.val() == ""){
                hintContainer.empty()
            }
            hintContainer.css("display", "block")
        }
    })
})