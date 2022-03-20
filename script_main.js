const divList = [];
divList.push(document.getElementById("intro"));
divList.push(document.getElementById("video"));
divList.push(document.getElementById("instructions"));

hideDivs();
divList[0].style.display = "block";

function hideDivs() {
    for (let i=0; i<divList.length; i++) {
        divList[i].style.display = "none";
    }
}

function nextSlide(slide) {
    hideDivs();
    divList[slide].style.display = "block";
}
