var myObj;
var accessToken = 'BQBLIxqJNRQ2nLNl0-IThaETQTNX1U5ym6l_5SCsq-OKeZ5-3iybr0M7ukvaKu85CnhD2aPSYMcSAKgs7k0ghW3kWiqAVv7B7ZtZL0TuvofHzk_8mNgu9PgjXUkSsd97RW8DRverBBVZDFdXgQJ1fDoVcWlBTBvejD92S6t2AUIxRUVBWw&refresh_token=AQDYTxoUAB8Fhp9e9hvcfz6A4oicmfxIhHSnYFg9ED85J2tFes9ycDt176HmbUnCK4_XqY8y0PiSt9RBLt_-HPD652OtK7R1Bdut2XvmXcQ8Am26lnnPEdF1Km2SoTEti3A';
var url = 'https://api.spotify.com/v1/search?q=year%3A2001&type=artist&limit=50';
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", url, true);
xmlhttp.setRequestHeader('Authorization', 'Bearer ' + accessToken);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        myObj = JSON.parse(xmlhttp.responseText);
        var txt = '<div class="container">';
        txt += '<div class="row">';
        for (var i=0; i < myObj.artists.items.length; i++) {
            txt += '<div class="col-md-3">';
            txt += '<div class="music-box">';
            txt += '<img class="img-fluid" src="' + myObj.artists.items[i].images[1].url + '" alt="image">';
            txt += '</div>';
            txt += '<p>' + myObj.artists.items[i].name + '</p>';
            txt += '<button class="btn btn-primary" onclick="showInfo(' + i + ')">Detail</button>';
            txt += '</div>';
        }
        txt += '</div>';
        txt += '</div>';
        document.getElementsByClassName("result")[0].innerHTML = txt;
    }
}

function showInfo(j) {
    var data;
    var artistId = myObj.artists.items[j].id;
    var url1 = 'https://api.spotify.com/v1/artists/' + artistId + '/albums';
    var xmr = new XMLHttpRequest();
    xmr.open("GET", url1, true);
    xmr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xmr.send();

    xmr.onreadystatechange = function () {
        if (xmr.readyState == 4 && xmr.status == 200) {
            data = JSON.parse(xmr.responseText);
            var out = '<div class="artist-inner">';
            out += '<div class="artist-img" data-ng-show="artistImage">';
            out += '<img class="rounded-circle img-polaroid" src="' + myObj.artists.items[j].images[1].url + '">';
            out += '</div>';
            out += '<h3 class="ng-binding">' + myObj.artists.items[j].name + '</h3>';
            out += '<div class="artist-style">';
            out += '<div class="artist-genre ng-scope" ng-repeat="genre in artistGenre">';
            out += '<span class="ng-binding">' + myObj.artists.items[j].genres[0] + '</span>';
            out += '<div class="artist-genre ng-scope" ng-repeat="genre in artistGenre">';
            out += '<span class="ng-binding">' + myObj.artists.items[j].genres[1] + '</span>';
            out += '<div class="artist-genre ng-scope" ng-repeat="genre in artistGenre">';
            out += '<span class="ng-binding">' + myObj.artists.items[j].genres[2] + '</span>';
            out += '</div>';
            out += '</div>';
            out += '</div>';
            document.getElementsByClassName("banner")[0].innerHTML = out;

            var info = '<div class="page">';
            info += '<div class="container">';
            info += '<div class="row">';
            info += '<div class="col-md-10 panel ">';
            info += '<div class="wrap">';
            info += '<div class="deatail-box">';


            for (var y = 0; y < data.items.length; y++) {
                info += '<div class="title-box">';
                info += '<div class="album_image">';
                info += '<img  alt="album image" src="' + data.items[y].images[1].url + '">';
                info += '</div>';
                info += '<div class="album_name">';
                info += '<p class="text-muted">' + data.items[y].album_type + '</p>';
                info += '<h4 class="ng-binding">' + data.items[y].name + '</h4>';
                info += '<div><a href="' + data.items[y].external_urls.spotify + '" class="btn btn-bordered btn-bordered-primary" target="_blank">Show more</a></div>';
                info += '</div>';
                showMusic(data,y);
                info += '</div>';
                info += '<div class="music"></div>';

            }
            info += '</div>';
            info += '</div>';
            info += '</div>';
            info += '</div>';
            info += '</div>';
            info += '</div>';

            document.getElementsByClassName("result")[0].innerHTML = info;
        }
    }
}

function showMusic(data,x) {
    var dat = data;
    var albumId = dat.items[x].id;
    var url2 = 'https://api.spotify.com/v1/albums/' + albumId + '/tracks?limit=5';
    var xml = new XMLHttpRequest();
    xml.open("GET", url2, true);
    xml.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xml.send();
    xml.onreadystatechange = function () {
        if (xml.readyState == 4 && xml.status == 200) {
            var jsonObj = JSON.parse(xml.responseText);
            var list = '<div class="music-listing">';
            for (var z = 0; z < jsonObj.items.length; z++) {
                var num = z + 1;
                list += '<div class="music-listing__row ">';
                list += '<div class="music-listing__number ">' + num + '</div>';
                list += '<div class="music-listing__name">';
                list += '<div class="music-listing__thumbnail">' + '</div>';
                list += '<div class="music-listing__song-name ">' + jsonObj.items[z].name + '</div>';
                list += '<div class="music-listing__song-link"><a href="' + jsonObj.items[z].preview_url + '" target="_blank">Play demo</a></div>';
                list += '</div>';
                list += '</div>';
            }
            list += '</div>';
            document.getElementsByClassName("music")[x].innerHTML = list;
        }
    }
}

function mySearch() {
    var find = document.getElementById("query").value;
    var res = encodeURI(find);
    var url1 = 'https://api.spotify.com/v1/search?q=' + res + '&type=artist';
    var xmr = new XMLHttpRequest();
    xmr.open("GET", url1, true);
    xmr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xmr.send();

    xmr.onreadystatechange = function () {
        if (xmr.readyState == 4 && xmr.status == 200) {
            var data = JSON.parse(xmr.responseText);

            var out = '<div class="container">';
            out += '<div class="row">';
            for (var a=0; a < data.artists.items.length; a++) {
                out += '<div class="col-md-3">';
                out += '<div class="music-box">';
                if (jQuery.isEmptyObject(data.artists.items[a].images)) {
                    out += '<p>No image available</p>';
                } else {
                    out += '<img class="img-fluid" src="' + data.artists.items[a].images[1].url + '" alt="image">';
                }
                out += '</div>';
                out += '<p>' + data.artists.items[a].name + '</p>';
                out += '<a href="' + data.artists.items[a].external_urls.spotify + '" target="_blank">More information</a>';
                out += '</div>';
            }
            out += '</div>';
            out += '</div>';
            document.getElementsByClassName("result")[0].innerHTML = out;

        }

    }
}