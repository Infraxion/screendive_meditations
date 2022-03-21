const num_questions = 10;
const num_options = 5;

const audio_matrix = [];

for (let i = 0; i < num_questions; i++) {
    const temp_matrix = [];
    for (let j = 0; j < num_options; j++) {
        temp_matrix[j] = document.getElementById("q" + i + "r" + j + "a");
    }
    audio_matrix[i] = temp_matrix;
}

const radio = function(q, r) {
    for (let j = 0; j < num_options; j++) {
        audio_matrix[q][j].muted = true;
    }
    audio_matrix[q][r].volume = 0.1;
    audio_matrix[q][r].muted = false;
}
