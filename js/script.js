const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.getElementById('currTime');

var songs = [];
var playlist = [];
let songIndex = 0;

fetch("json/songurls.json")
.then(response => response.json())
.then(data => {
  init(data.songs);
})

function init(data) {
    songs = data;
    var html = '<ol class="gradient-list">';
    data.forEach(song => {
        html += "<li>" + song.url + '<button onclick="addSong('+song.id+')">Add</button><button onclick="loadSong('+song.id+')">Play</button><br></li>';
    });
    html += "</ol>"
    var mainContent = document.getElementById("main-content");
    if (mainContent) {
        mainContent.innerHTML = html;
    }
}

function showPlaylists() {
  var html = '<ol class="gradient-list">';
  for (var i = 0; i < localStorage.length; i++){
    var item = "<li>" + localStorage.key(i) + '<button onclick="openPlaylist(\''+localStorage.key(i)+'\')">Open</button></li>';
    html += item + '<br>';
  }
  html += "</ol>"
  document.getElementById("playlist-content").innerHTML = html;
}

function openPlaylist(name) {
  var playlistJSON = JSON.parse(localStorage.getItem(name));
  songs = [];
  var html = '<ol class="gradient-list">';
  var counter = 0;
  playlistJSON.songs.forEach(song => {
    if (song) {
      html += "<li>" + song.url + '<button onclick="loadSong('+counter+')">Play</button><br></li>';
      songs.push({
        id: counter,
        name: song.name,
        url: song.url
      });
      counter++;
    }
  });
  html += "</ol>"
  var mainContent = document.getElementById("playlist-content");
  if (mainContent) {
    mainContent.innerHTML = html;
  }
}

function addSong(songId) {
  song = songs[songId];

  var container = document.getElementById('dynamic-form-area');
  if (container) {
    var select = '<select name="playlists" id="playlists">';
    for (var i = 0; i < localStorage.length; i++){
      select += '<option value="'+localStorage.key(i)+'">'+localStorage.key(i)+'</option>';
    }
    select += '</select>';

    var html = '\
    <div class="bg-modal" id="bg-modal">\
        <div class="modal-content">\
            <div class="modal-header">\
                Add song\
                <i class="fa fa-close fa-2x" aria-hidden="true" id="fa-close-form"></i>\
            </div>\
                <table style="margin:0 auto 15px auto;">\
                    <tr>\
                        <td>'+select+'</td>\
                    </tr>\
                    <tr>\
                      <td>\
                        <button id="add-song-button">\
                          Add\
                        </button>\
                      </td>\
                    </tr>\
                </table>\
        </div>\
    </div>';
    container.innerHTML = html;
    document.getElementById('bg-modal').style.display = 'flex';
    document.querySelector('html').style.overflow = 'hidden';

    var faCloseDynamicform = document.getElementById('fa-close-form');
    if (faCloseDynamicform) {
      faCloseDynamicform.addEventListener('click',
        function() {
          var container = document.getElementById("dynamic-form-area");
          if (container) {
            container.innerHTML = '';
          }
        }
      )
    }

    var addSong = document.getElementById('add-song-button');
    if (addSong) {
      addSong.addEventListener('click',
        function() {
          var playlistName = document.getElementById("playlists").value;
          console.log(playlistName);
          if (playlistName) {
            var playlist = localStorage.getItem(playlistName);
            playlist = JSON.parse(playlist);
            playlist.songs[songId] = song;
            localStorage.setItem(playlistName, JSON.stringify(playlist));
            console.log(localStorage);
          }
          var container = document.getElementById("dynamic-form-area");
          if (container) {
            container.innerHTML = '';
          }
        }
      )
    }
  }
}

// Update song details
function loadSong(songId) {
  song = songs[songId];
  console.log(songId);
  songIndex = songId;
  title.innerText = song.name;
  audio.src = 'http://localhost:8000/music/'+song.url;

  playSong();
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
  var playPromise = audio.play();

  // In browsers that don’t yet support this functionality,
  // playPromise won’t be defined.
  if (playPromise !== undefined) {
    playPromise.then(function() {
      // Automatic playback started!
    }).catch(function(error) {
      // Automatic playback failed.
      // Show a UI element to let the user manually start playback.
    });
  }
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songIndex);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songIndex);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);
};

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);

let volume = document.querySelector("#volume-control");
volume.addEventListener("change", function(e) {
audio.volume = e.currentTarget.value / 100;
})

function createPlaylist() {
  var container = document.getElementById('dynamic-form-area');
  if (container) {
    html = '\
    <div class="bg-modal" id="bg-modal">\
        <div class="modal-content">\
            <div class="modal-header">\
                Create Playlist\
                <i class="fa fa-close fa-2x" aria-hidden="true" id="fa-close-form"></i>\
            </div>\
                <table style="margin:0 auto 15px auto;">\
                    <tr>\
                        <td><textarea id="playlist-name" type="text" name="title" cols="40" rows="1" placeholder="name"></textarea></td>\
                    </tr>\
                    <tr>\
                      <td>\
                        <button id="create-playlist-button">\
                          Create\
                        </button>\
                      </td>\
                    </tr>\
                </table>\
        </div>\
    </div>';
    container.innerHTML = html;
    document.getElementById('bg-modal').style.display = 'flex';
    document.querySelector('html').style.overflow = 'hidden';
      
    var faCloseDynamicform = document.getElementById('fa-close-form');
    if (faCloseDynamicform) {
      faCloseDynamicform.addEventListener('click',
        function() {
          var container = document.getElementById("dynamic-form-area");
          if (container) {
            container.innerHTML = '';
          }
        }
      )
    }
    
    var createPlaylist = document.getElementById('create-playlist-button');
    if (createPlaylist) {
      createPlaylist.addEventListener('click',
        function() {
          var playlistName = document.getElementById("playlist-name").value;
          if (playlistName) {
            localStorage.setItem(playlistName, '{"songs": []}');
            console.log(localStorage);
          }
          var container = document.getElementById("dynamic-form-area");
          if (container) {
            container.innerHTML = '';
          }
        }
      )
    }
  }
}
