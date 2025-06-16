const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');

let running = false;
let score = 0;
let frameId;

const dinosaur = {
    x: 50,
    y: 0,
    width: 40,
    height: 40,
    velocityY: 0,
    jumpPower: 15,
    gravity: 0.8,
    isJumping: false
};

function resetDinoPosition() {
    dinosaur.y = canvas.height - dinosaur.height - 20;
}

function clearCanvas() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateDino() {
    if (dinosaur.isJumping) {
        dinosaur.y += dinosaur.velocityY;
        dinosaur.velocityY += dinosaur.gravity;
        const ground = canvas.height - dinosaur.height - 20;
        if (dinosaur.y >= ground) {
            dinosaur.y = ground;
            dinosaur.velocityY = 0;
            dinosaur.isJumping = false;
        }
    }
}

function drawDino() {
    ctx.fillStyle = '#333';
    ctx.fillRect(dinosaur.x, dinosaur.y, dinosaur.width, dinosaur.height);
}

function draw() {
    clearCanvas();
    updateDino();
    drawDino();

    score += 1;
    scoreDisplay.textContent = score;

    frameId = requestAnimationFrame(draw);
}

function startGame() {
    if (!running) {
        running = true;
        score = 0;
        resetDinoPosition();
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

canvas.addEventListener('click', () => {
    if (!dinosaur.isJumping) {
        dinosaur.velocityY = -dinosaur.jumpPower;
        dinosaur.isJumping = true;
    }
});
