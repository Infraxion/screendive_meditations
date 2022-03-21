const slideList = [];
slideList.push(document.getElementById("slideIntro"));
slideList.push(document.getElementById("slideVideo"));
slideList.push(document.getElementById("slideInstructions"));

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
    }
    if (window.location.hash === "#video") {
        slideList[1].style.display = "block";
    }
    if (window.location.hash === "#instructions") {
        slideList[2].style.display = "block";
    }
}

function setSlide(slide) {
    if (slide === 0) {
        window.location.hash = "intro";
    }
    if (slide === 1) {
        window.location.hash = "video";
    }
    if (slide === 2) {
        window.location.hash = "instructions";
    }
}

window.addEventListener('popstate', (e) => {
    hideSlides();
    updateSlide();
})
