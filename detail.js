var x = document.getElementsByClassName("col-md-3")[0];
var artistId = myObj.artists.items[x].id;
var accessToken = 'BQB3YzsubzDaBbBVdRb5dWrVvIUQ0ebde2ta52T00j0-HL07JpZHI1I-u5VzFJQv5nUtp9Rt4O2p8d-yHVYC5EWTx1Wn9ZoPsLvJv2UFJA0NObYn4pQIgmDZysmVvRjb_V7ug6D0MzVeMk_DnHuz0Dnuouetk6O0py3IlIArBiNUY8ZkQw&refresh_token=AQCpXJc8Y9kchjxQTCg8wmCaYfphyYTdIWF7dP2jsY0kYx0dYdtFMY0Fb58gtlxN6RBrcnD2IapoPPgG4CXEnn1Nq5zfX103VKxeV6Kawmn3XMxrb0Nn60UYTZmo0YPtOco';
var url1 = 'https://api.spotify.com/v1/artists/' + artistId + '/albums';
var xmr = new XMLHttpRequest();
xmr.open("GET", url1, true);
xmr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
xmr.send();

xmr.onreadystatechange = function () {
    if (xmr.readyState == 4 && xmr.status == 200) {
        var data = JSON.parse(xmr.responseText);
        var out = "<table>";
        for (var y=0; y < data.items.length; y++) {
            out += '<tr>';
            out += '<td>' + data.items[y].name + '</td>';
            out += '<td>' + data.items[y].album_type + '</td>';
            out += '<td><img src="' + data.items[y].images[1].url + '"></td>';
            out += '</tr>';
        }
        out += "</table>";

        document.getElementById("info").innerHTML = out;
    }
}