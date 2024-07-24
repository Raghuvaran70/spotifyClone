console.log("Welcome to Spotify");

//Initialize the variables

let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName('songItem'));
//Songs List
let songs =[
    {songName:"Legion",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Trap",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"They Mad",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"Plug Walk",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"Song Title",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"Safety Dance",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},

]

songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;

})



//Handle play/pause click
masterPlay.addEventListener('click',()=>{
        //if the song is not playing
        if(audioElement.paused || audioElement.currentTime<=0){
             audioElement.play();
             masterPlay.setAttribute('src','pause.svg');
             gif.style.opacity = 1;
        }else{ //song is playing
            audioElement.pause();
            masterPlay.setAttribute('src','circle-play-regular.svg');
            makeAllPlays();
            gif.style.opacity = 0;

        }
    })

// Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    //update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('playButton')).forEach((el)=>{
        el.setAttribute('src','circle-play-regular.svg');
    })
}

//playButton in the songItems
Array.from(document.getElementsByClassName('playButton')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target);
        makeAllPlays();
        let songIndex  = parseInt(e.target.id);
        e.target.setAttribute('src','pause.svg');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.setAttribute('src','pause.svg');
    })
});

//next button in the controls present in .bottom
(document.querySelector('#next')).addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex=0;
    }else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.setAttribute('src','pause.svg');

})

//previous button in the controls present in .bottom
(document.querySelector('#previous')).addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=5;
    }else{
        songIndex -=1;
    }  
    audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.setAttribute('src','pause.svg');
})