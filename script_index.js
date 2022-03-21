const slideList = [];
slideList.push(document.getElementById("slideIntro"));
slideList.push(document.getElementById("slideSplash"));
slideList.push(document.getElementById("slideInstructions"));
const audioSplash = document.getElementById("audioSplash");
const audioInstructions = document.getElementById("audioInstructions");

hideSlides();
updateSlide();

function hideSlides() {
    for (let i=0; i<slideList.length; i++) {
        slideList[i].style.display = "none";
    }
}

function updateSlide() {
    if (window.location.hash === "#intro" || window.location.hash === "") {
        slideList[0].style.display = "block";

        resetAudio()
    }
    if (window.location.hash === "#splash") {
        slideList[1].style.display = "block";

        resetAudio()
        audioSplash.play();
        audioSplash.volume = 0.25;
    }
    if (window.location.hash === "#instructions") {
        slideList[2].style.display = "block";

        resetAudio()
        audioInstructions.play();
        audioInstructions.volume = 0.25;
    }
}

function resetAudio() {
    audioSplash.pause();
    audioSplash.currentTime = 0;
    audioInstructions.pause();
    audioInstructions.currentTime = 0;
}

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
}

window.addEventListener('popstate', (e) => {
    hideSlides();
    updateSlide();
})
