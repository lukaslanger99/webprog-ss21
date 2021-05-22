const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
// const songs = ['hey', 'summer', 'ukulele'];
var songs = {};
let songIndex = 0;

fetch("json/songurls.json")
.then(response => response.json())
.then(data => {
  init(data.songs);
})

function init(data) {
    songs = data;
    // loadSong(songIndex);

    var html = "";
    data.forEach(song => {
        html += song.url + '<button onclick="loadSong('+song.id+')">Play</button><br>';
    });
    var mainContent = document.getElementById("main-content");
    if (mainContent) {
        mainContent.innerHTML = html;
    }
}

// Update song details
function loadSong(songId) {
  song = songs[songId];
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

  // audio.play();
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
// function updateProgress(e) {
//   const { duration, currentTime } = e.srcElement;
//   const progressPercent = (currentTime / duration) * 100;
//   progress.style.width = `${progressPercent}%`;
// }

// Set progress bar
// function setProgress(e) {
//   const width = this.clientWidth;
//   const clickX = e.offsetX;
//   const duration = audio.duration;

//   audio.currentTime = (clickX / width) * duration;
// }

//get duration & currentTime for Time of song
// function DurTime (e) {
// 	const {duration,currentTime} = e.srcElement;
// 	var sec;
// 	var sec_d;

// 	// define minutes currentTime
// 	let min = (currentTime==null)? 0:
// 	 Math.floor(currentTime/60);
// 	 min = min <10 ? '0'+min:min;

// 	// define seconds currentTime
// 	function get_sec (x) {
// 		if(Math.floor(x) >= 60){
			
// 			for (var i = 1; i<=60; i++){
// 				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
// 					sec = Math.floor(x) - (60*i);
// 					sec = sec <10 ? '0'+sec:sec;
// 				}
// 			}
// 		}else{
// 		 	sec = Math.floor(x);
// 		 	sec = sec <10 ? '0'+sec:sec;
// 		 }
// 	} 

// 	get_sec (currentTime,sec);

// 	// change currentTime DOM
// 	currTime.innerHTML = min +':'+ sec;

// 	// define minutes duration
// 	let min_d = (isNaN(duration) === true)? '0':
// 		Math.floor(duration/60);
// 	 min_d = min_d <10 ? '0'+min_d:min_d;


// 	 function get_sec_d (x) {
// 		if(Math.floor(x) >= 60){
			
// 			for (var i = 1; i<=60; i++){
// 				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
// 					sec_d = Math.floor(x) - (60*i);
// 					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
// 				}
// 			}
// 		}else{
// 		 	sec_d = (isNaN(duration) === true)? '0':
// 		 	Math.floor(x);
// 		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
// 		 }
// 	} 

// 	// define seconds duration
	
// 	get_sec_d (duration);

// 	// change duration DOM
// 	durTime.innerHTML = min_d +':'+ sec_d;
		
// };

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
// audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
// progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
// audio.addEventListener('timeupdate',DurTime);
