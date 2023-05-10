const playBtn = document.querySelector('.playbtn'),
container = document.querySelector('.container'),
video = document.querySelector('video'),
range = document.querySelector('input'),
volumeBtn = document.querySelector('.volumebtn'),
progressBar = document.querySelector('.progressbar'),
progress = document.querySelector('.child'),
timer = document.querySelector('.timer'),
backwardBtn = document.querySelector('.fa-backward'),
forwardBtn = document.querySelector('.fa-forward'),
playBackSpeedBtn = document.querySelector('.fa-gauge'),
optionBox = document.querySelector('.speed-option-box'),
pictureInPictureBtn = document.querySelector('.fa-display'),
fullScreenBtn = document.querySelector('.fa-expand'),
currentTag = document.querySelector('.current'),
durationTag = document.querySelector('.duration'),
wrapper = document.querySelector('.wrapper')

video.addEventListener('play', () => {
    playBtn.classList.replace('fa-play', 'fa-pause')
})

video.addEventListener('pause', () => {
    playBtn.classList.replace('fa-pause', 'fa-play')
})

playBtn.addEventListener('click', () => {
    video.paused? video.play() : video.pause();
})

range.addEventListener('input', (e) => {
    video.volume = e.target.value;
    if(e.target.value === '0'){
        volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark')
    }else{
        volumeBtn.classList.replace('fa-volume-xmark', 'fa-volume-high')

    }
})

volumeBtn.addEventListener('click', () => {
    if(volumeBtn.classList.contains('fa-volume-high')){
        video.volume = 0;
        volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark')
        range.value = 0;
    }else{
        video.volume = 0.5;
        range.value = 0.5;
        volumeBtn.classList.replace('fa-volume-xmark', 'fa-volume-high')
    }
})

const formathTime = (time) => {
   let second = Math.floor(time % 60);
   let minute = Math.floor(time / 60);
   let hour = Math.floor(time / 3600);

    second = second < 10 ? '0' + second.toString(): second;
    minute = minute < 10 ? '0' + minute.toString(): minute;
    hour = hour < 10 ? '0' + hour.toString(): hour;

    if(hour == 0){
       return `${minute}:${second}`;
    }

    return `${hour}:${minute}:${second}`
}

video.addEventListener('timeupdate', (e) => {
    let {currentTime, duration} = e.target;
    let persent = (currentTime / duration) * 100;
    progress.style.width = `${persent}%`;

    currentTag.innerHTML = formathTime(currentTime);
})

video.addEventListener('click', () => {
    if(video.paused){
        video.play();
    }else{
        video.pause()
    }
})

video.addEventListener('loadeddata', (e) => {
    durationTag.innerHTML = formathTime(e.target.duration)
})

backwardBtn.addEventListener('click', () => {
    video.currentTime -= 5;
})

forwardBtn.addEventListener('click', () => {
    video.currentTime += 5;
})

playBackSpeedBtn.addEventListener('mouseover', () => {
    optionBox.style.opacity = 1;
    optionBox.style.pointerEvents = 'auto';
})

document.addEventListener('click', (e) => {
    if(e.target.tagName !== 'LI'){
        optionBox.style.opacity = 0;
        optionBox.style.pointerEvents = 'none';
    }
})

document.querySelectorAll('.speed-option-box li').forEach(option => {
    option.addEventListener('click', () => {
        video.playbackRate = option.dataset.speed;
        document.querySelector('.active').classList.remove('active');
        option.classList.add('active')
    })
})

pictureInPictureBtn.addEventListener('click', () => {
    video.requestPictureInPicture()
})

fullScreenBtn.addEventListener('click', () => {
    container.classList.toggle('fullscreen')
    if(document.fullscreenElement){
        fullScreenBtn.classList.replace('fa-compress', 'fa-expand');
        return document.exitFullscreen()
    }
    fullScreenBtn.classList.replace('fa-expand', 'fa-compress');
    container.requestFullscreen()
})

progressBar.addEventListener('click', (e) => {
    let timelineWidth = progressBar.clientWidth;
    video.currentTime = (e.offsetX / timelineWidth) * video.duration;
})

const draging = (e) => {
   let timelineWindth = progressBar.clientWidth;
   progress.style.width = `${e.offsetX}px`;
   video.currentTime = (e.offsetX / timelineWindth) * video.duration;
}

progressBar.addEventListener('mousedown', () => {
    progressBar.addEventListener('mousemove', draging)
})

progressBar.addEventListener('mouseup', () => {
    progressBar.removeEventListener('mousemove', draging)
})

document.addEventListener('keyup', (e) => {
    // console.log(e.key)
    if(e.key === 'ArrowRight'){
        video.currentTime += 5;
    }else if(e.key === 'ArrowLeft'){
        video.currentTime -= 5;
    }else if(e.key === ' '){
        if(video.paused){
            video.play()
        }else{
            video.pause()
        }
    }
})

video.addEventListener('mousemove', () => {
    wrapper.classList.add('show');
})

video.addEventListener('mouseout', () => {
    setTimeout(() => {wrapper.classList.remove('show')}, 2000)
})