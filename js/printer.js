var songs = {};

fetch("./json/songurls.json")
.then(response => response.json())
.then(data => {
    songs = data
})

function printTitles(data) {
    var html = "";
    data.songs.forEach(song => {
        html += song.url + '<button onclick="playSong('+song.id+')">Play</button><br>';
    });
    var mainContent = document.getElementById("main-content");
    if (mainContent) {
        mainContent.innerHTML = html;
    }
}

function playSong(songID) {
    songs['songs'].forEach(function(song){
        if (song.id == songID) {
            console.log("played: "+song.name);
            location.href = './files/'+song.url;
        }
      });

}