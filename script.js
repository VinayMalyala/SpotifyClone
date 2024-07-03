console.log("Welcome to Spotify...");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/Kanave.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: 'Kanave Kanave', path: 'songs/Kanave.mp3', coverPath: 'images/covers/Kanave.png' },
    { songName: 'Evarevaro', path: 'songs/Evarevaro.mp3', coverPath: 'images/covers/Evarevaro.png' },
    { songName: 'A Love so Beautiful', path: 'songs/A_love_so_beautiful.mp3', coverPath: 'images/covers/a-love-so-beautiful-4.webp' },
    { songName: 'I (Reprise)', path: 'songs/I.mp3', coverPath: 'images/covers/I.png' },
    { songName: 'Nuvvunte', path: 'songs/Nuvvunte.mp3', coverPath: 'images/covers/Nuvvunte.png' },
    { songName: 'Pilla O Pilla', path: 'songs/Pilla.mp3', coverPath: 'images/covers/Pilla.png' },
    { songName: 'Samjhawaan', path: 'songs/Samjhawaan.mp3', coverPath: 'images/covers/Samjhawan.png' },
    { songName: 'Yedurangula Vaana', path: 'songs/Yedurangula.mp3', coverPath: 'images/covers/Yedurangula.png' },
]

songItems.forEach((element, i) => {
    // console.log(element, i)
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// Handle play/pause click 
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
    }
})

// Listen to Event
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-pause-circle');
        // audioElement.src = `songs/{songIndex+1}.mp3`;
        audioElement.src = songs[songIndex].path;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
});

document.getElementById('next').addEventListener('click', () => {
    if(songIndex > 9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    // audioElement.src = `songs/{songIndex+1}.mp3`;
    audioElement.src = songs[songIndex].path;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    // audioElement.src = `songs/{songIndex+1}.mp3`;
    audioElement.src = songs[songIndex].path;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});