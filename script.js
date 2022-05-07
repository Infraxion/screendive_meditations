const slideList = [];
slideList.push(document.getElementById("slideIntro"));
slideList.push(document.getElementById("slideSplash"));
slideList.push(document.getElementById("slideInstructions"));
slideList.push(document.getElementById("slideQuestions"));
slideList.push(document.getElementById("slideHum"));
slideList.push(document.getElementById("slideResults"));
slideList.push(document.getElementById("slideFinal"));
const audioSplash = document.getElementById("audioSplash");
const videoSplash = document.getElementById("videoSplash")
const audioInstructions = document.getElementById("audioInstructions");
const audioInstructionsVO = document.getElementById("audioInstructionsVO");
const audioResults = document.getElementById("audioResults");
const videoLoading = document.getElementById("videoLoading");
const videoFinal = document.getElementById("videoFinal");

let recordedAudio = new Audio();

const num_questions = 11;
const num_responses = 5;

const fade_step = 0.01;
const fade_interval = 20;
const wait_time = 1000;

const audio_matrix = [];

let humming = false;

// register question audios
for (let q = 0; q < num_questions; q++) {
    let temp_matrix = [];
    for (let r = 0; r < num_responses; r++) {
        temp_matrix[r] = document.getElementById("q" + q + "r" + r + "a");
    }
    audio_matrix[q] = temp_matrix;
}

// slide change callback
window.addEventListener('popstate', (e) => {
    hideSlides();
    updateSlide();
})

// prepare all slides and open first
updateSlide();

// slide logic
function updateSlide() {
    hideSlides();
    resetMedia();

    if (window.location.hash === "#intro" || window.location.hash === "") {
        slideList[0].style.display = "block";
        resetQuestionAudio();
    }
    if (window.location.hash === "#splash") {
        slideList[1].style.display = "block";
        resetQuestionAudio();

        setTimeout(function() {
            audioSplash.play();
            audioSplash.currentTime = 0;
            fadeIn(audioSplash, 0.25);

            videoSplash.currentTime = 0;
            videoSplash.play();
        }, wait_time);
    }
    if (window.location.hash === "#instructions") {
        slideList[2].style.display = "block";
        resetQuestionAudio();

        setTimeout(function() {
            audioInstructions.currentTime = 0;
            audioInstructions.play();
            fadeIn(audioInstructions, 0.20);

            audioInstructionsVO.currentTime = 0;
            audioInstructionsVO.play();
            fadeIn(audioInstructionsVO, 0.5);
        }, wait_time);
    }
    if (window.location.hash === "#questions") {
        slideList[3].style.display = "block";
        resetQuestionAudio();
    }
    if (window.location.hash === "#hum") {
        slideList[4].style.display = "block";
    }
    if (window.location.hash === "#results") {
        slideList[5].style.display = "block";

        setTimeout(function() {
            audioResults.currentTime = 0;
            audioResults.play();
            fadeIn(audioResults, 0.25);
        }, wait_time);
    }
    if (window.location.hash === "#final") {
        slideList[6].style.display = "block";
        resetQuestionAudio();

        setTimeout(function() {
            videoFinal.currentTime = 0;
            videoFinal.play();
            fadeIn(videoFinal, 1);
        }, wait_time);
    }
}

// change slides
function setSlide(slide) {
    if (slide === 0) {
        window.location.hash = "intro";
    }
    if (slide === 1) {
        window.location.hash = "splash";
    }
    if (slide === 2) {
        window.location.hash = "instructions";
    }
    if (slide === 3) {
        window.location.hash = "questions";
    }
    if (slide === 4) {
        window.location.hash = "hum";
    }
    if (slide === 5) {
        window.location.hash = "results";
    }
    if (slide === 6) {
        window.location.hash = "final";
    }
}

// hide all slides
function hideSlides() {
    for (let i=0; i<slideList.length; i++) {
        slideList[i].style.display = "none";
    }
    videoLoading.style.opacity = "0";
    humming = false;
}


// fade out all audio and video
function resetMedia() {
    fadeOut(audioSplash);
    fadeOut(videoSplash);
    fadeOut(audioInstructions);
    fadeOut(audioInstructionsVO);
    fadeOut(audioResults);
    fadeOut(videoFinal);
    recordedAudio.pause();
}

// fade out all question audio
function resetQuestionAudio() {
    for (let q = 0; q < num_questions; q++) {
        for (let o = 0; o < num_responses; o++) {
            fadeOut(audio_matrix[q][o]);
        }
    }
}

// radio button callback
function radio(q, r) {
    for (let r = 0; r < num_responses; r++) {
        fadeOut(audio_matrix[q][r]);
    }

    setTimeout(function() {
        fadeIn(audio_matrix[q][r], 0.25);
    }, wait_time);
}

function hum() {
    if (humming === true) {
        return;
    }

    humming = true;
    videoLoading.style.opacity = "1";

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            const audioChunks = [];
            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                recordedAudio = new Audio(audioUrl);
                recordedAudio.loop = true;
                recordedAudio.play();
            });

            setTimeout(() => {
                mediaRecorder.stop();
                setSlide(5);
            }, 10000);
        });
}

// media fade tools
function fadeIn(media, target) {
    media.muted = false;
    let fadeInterval = setInterval(function() {
        if(media.volume < target - fade_step){
            media.volume += fade_step;
        } else {
            clearInterval(fadeInterval);
            media.volume = target;
        }
    }, fade_interval);
}

function fadeOut(media) {
    let fadeInterval = setInterval(function() {
        if(media.volume > fade_step){
            media.volume -= fade_step;
        } else {
            clearInterval(fadeInterval);
            media.muted = true;
            media.volume = 0;
        }
    }, fade_interval);
}
