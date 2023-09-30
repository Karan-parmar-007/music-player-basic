const heading = document.getElementById("color-changing-heading");
const colors = ["red", "blue", "green"];
let currentIndex = 0;

function changeColor() {
  heading.style.color = colors[currentIndex];
  currentIndex = (currentIndex + 1) % colors.length;
}

setInterval(changeColor, 2000);

let index = 0;
let audioElement = new Audio('/songs/Thunder.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('progressBar');
let gifPlay = document.getElementById('gifId');
let nextSong = document.getElementById('nextSong');
let prevSong = document.getElementById('prevSong');
let musicName = document.getElementById('musicName')

let songs = [
    {songName: "thunder", filePath: "/songs/Thunder.mp3", coverPath: "/cover1.png"},
    {songName: "On My Way", filePath: "/songs/On My Way.mp3", coverPath: "/cover2.png"},
    {songName: "LiSA - unlasting", filePath: "/songs/LiSA - unlasting.mp3", coverPath: "/cover3.png"},
    {songName: "Legends Never Die", filePath: "/songs/Legends Never Die.mp3", coverPath: "/cover4.png"},
    {songName: "Remember our summer", filePath: "/songs/Remember our summer.mp3", coverPath: "/cover5.png"},
    {songName: "Teeth", filePath: "/songs/Teeth.mp3", coverPath: "/cover6.png"},
    {songName: "TheFatRat - Monoday", filePath: "/songs/TheFatRat - Monoday.mp3", coverPath: "/cover7.png"},
]


masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.src = "/all_icons/pause-solid.svg"
        gifPlay.style.opacity = 1;
        musicName.innerText = songs[index].songName;
    }
    else{
        audioElement.pause();
        masterPlay.src = "/all_icons/play-solid.svg"
        gifPlay.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate',() => {
    let progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('shortcutIconPlay')).forEach((element) =>{
        element.src = '/all_icons/play-solid.svg';
    });
};


Array.from(document.getElementsByClassName('shortcutIconPlay')).forEach((element) => {
    element.addEventListener('click', (e)=>{
        makeAllPlay()
        index = parseInt(e.target.id)
        e.target.src = '/all_icons/pause-solid.svg';
        audioElement.src = songs[index].filePath;
        musicName.innerText = songs[index].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.src = "/all_icons/pause-solid.svg"
        gifPlay.style.opacity = 1;
    });
});


nextSong.addEventListener('click', ()=>{
    if(index >= 6){
        index = 0
    }
    else{
        index = index + 1;
    }
    makeAllPlay()
    audioElement.src = songs[index].filePath;
    musicName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.src = "/all_icons/pause-solid.svg"
})

prevSong.addEventListener('click', ()=>{
    if(index <= 0){
        index = 6
    }
    else{
        index = index - 1;
    }
    makeAllPlay()
    audioElement.src = songs[index].filePath;
    musicName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.src = "/all_icons/pause-solid.svg"
})

audioElement.addEventListener('ended', () => {
    if(index >= 6){
        index = 0
    }
    else{
        index = index + 1;
    }
    makeAllPlay()
    audioElement.src = songs[index].filePath;
    musicName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.src = "/all_icons/pause-solid.svg"
});