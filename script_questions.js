const loop_background = document.getElementById("loop_background");
const loop_A = document.getElementById("loop_A");
const loop_CS = document.getElementById("loop_CS");
const loop_C = document.getElementById("loop_C");
const loop_D = document.getElementById("loop_D");
const loop_E = document.getElementById("loop_E");
const loop_FS = document.getElementById("loop_FS");
const loop_F = document.getElementById("loop_F");
const loop_GS = document.getElementById("loop_GS");
const loop_G = document.getElementById("loop_G");

const input = function(e) {
    if(e.type === 'touchstart' || e.type === 'mousedown') {
        loop_background.play();
        loop_A.play();
        loop_CS.play();
        loop_C.play();
        loop_D.play();
        loop_E.play();
        loop_FS.play();
        loop_F.play();
        loop_GS.play();
        loop_G.play();
    }
}

const radio = function(q, r) {
    if(q === 1 || r === 1) {
        loop_D.muted = false;
    }
}

document.addEventListener('touchstart', input, false);
document.addEventListener('mousedown', input, false);
