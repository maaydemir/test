const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');

let running = false;
let score = 0;
let frameId;

function clearCanvas() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clearCanvas();
    // Placeholder for drawing the dinosaur, obstacles, etc.
    ctx.fillStyle = '#333';
    ctx.fillRect(50, canvas.height - 60, 40, 40); // simple square dinosaur

    score += 1;
    scoreDisplay.textContent = score;

    frameId = requestAnimationFrame(draw);
}

function startGame() {
    if (!running) {
        running = true;
        score = 0;
        draw();
    }
}

function stopGame() {
    running = false;
    cancelAnimationFrame(frameId);
}

startBtn.addEventListener('click', () => {
    if (running) {
        stopGame();
        startBtn.textContent = 'Start';
    } else {
        startGame();
        startBtn.textContent = 'Stop';
    }
});
