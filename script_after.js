const slideList = [];
slideList.push(document.getElementById("slideHum"));
slideList.push(document.getElementById("slideResults"));
slideList.push(document.getElementById("slideFinal"));
const audioResults = document.getElementById("audioResults");
const videoFinal = document.getElementById("videoFinal")

hideSlides();
updateSlide();

function hideSlides() {
    for (let i=0; i<slideList.length; i++) {
        slideList[i].style.display = "none";
    }
}

function updateSlide() {
    if (window.location.hash === "#hum" || window.location.hash === "") {
        slideList[0].style.display = "block";

        resetAudio()
    }
    if (window.location.hash === "#results") {
        slideList[1].style.display = "block";

        resetAudio()
        audioResults.play();
        audioResults.volume = 0.25;
    }
    if (window.location.hash === "#final") {
        slideList[2].style.display = "block";

        resetAudio()
        videoFinal.play();
        videoFinal.volume = 1;
    }
}

function resetAudio() {
    audioResults.pause();
    audioResults.currentTime = 0;
    videoFinal.pause();
    videoFinal.currentTime = 0;
}

function setSlide(slide) {
    if (slide === 0) {
        window.location.hash = "hum";
    }
    if (slide === 1) {
        window.location.hash = "results";
    }
    if (slide === 2) {
        window.location.hash = "final";
    }
}

window.addEventListener('popstate', (e) => {
    hideSlides();
    updateSlide();
})
