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
        console.log($(this).find('h4').find('a').text());
        searchBox.val($(this).find('h4').find('a').text());
    });

    let displayHints = (songs) => {
        hintContainer.empty();

        songs.forEach(hint => {
            var hints = `<ul class="main__list">`
            var singleItem = `
            <li class="single-item">
                <a data-link="" data-title="${hint.name}"
                    data-artist="${hint.artist.name}"
                    data-img="${hint.thumbnail}"
                    data-keysource="${hint.keySource}" class="single-item__cover">
                    <img src=${hint.thumbnail} alt="" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                        <path
                            d="M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L7.88,18.81a1.44,1.44,0,0,1-1.42,0,1.42,1.42,0,0,1-.71-1.23V6.42a1.42,1.42,0,0,1,.71-1.23A1.51,1.51,0,0,1,7.17,5a1.54,1.54,0,0,1,.71.19l9.66,5.58a1.42,1.42,0,0,1,0,2.46Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M16,2a3,3,0,0,0-3,3V19a3,3,0,0,0,6,0V5A3,3,0,0,0,16,2Zm1,17a1,1,0,0,1-2,0V5a1,1,0,0,1,2,0ZM8,2A3,3,0,0,0,5,5V19a3,3,0,0,0,6,0V5A3,3,0,0,0,8,2ZM9,19a1,1,0,0,1-2,0V5A1,1,0,0,1,9,5Z" />
                        </svg>
                </a>
                <div class="single-item__title">
                    <h4><a href="#">
                    ${hint.name}
                        </a>
                    </h4>
                    <span><a href="">
                    ${hint.artist.name}
                        </a></span>
                </div>
                <button class="addToPlaylistBtn" data-idSong="${hint.id}">+</button>
            </li>
            `
            var closeHints = `</ul>`
            singleItem += closeHints
            hints += singleItem
            hintContainer.append(hints)
        })
    }

    $(document).on('click', (event) => {
        var isClickInsideInput = searchBox.is(event.target);
        var isClickInsideHintContainer = $(event.target).closest('#hint-container').length > 0;
        if (!isClickInsideInput && !isClickInsideHintContainer) {
            hintContainer.css("display", "none")
        } else {
            if (searchBox.val() == "") {
                hintContainer.empty()
            }
            hintContainer.css("display", "block")
        }
    })
})