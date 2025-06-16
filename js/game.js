const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');
const restartBtn = document.getElementById('restart-btn');

let running = false;
let score = 0;
let frameId;
let spawnCounter = 0;
const obstacles = [];
const groundHeight = 20;
const gameSpeed = 6;

function showGameOver() {
    gameOverScreen.style.display = 'flex';
}

function hideGameOver() {
    gameOverScreen.style.display = 'none';
}

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
    dinosaur.y = canvas.height - dinosaur.height - groundHeight;
}

function spawnObstacle() {
    const height = 30 + Math.random() * 20;
    obstacles.push({
        x: canvas.width,
        y: canvas.height - height - groundHeight,
        width: 15,
        height: height
    });
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= gameSpeed;
        if (obs.x + obs.width < 0) {
            obstacles.splice(i, 1);
        }
    }
}

function drawObstacles() {
    ctx.fillStyle = 'green';
    obstacles.forEach(obs => {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });
}

function checkCollisions() {
    for (const obs of obstacles) {
        if (
            dinosaur.x < obs.x + obs.width &&
            dinosaur.x + dinosaur.width > obs.x &&
            dinosaur.y < obs.y + obs.height &&
            dinosaur.y + dinosaur.height > obs.y
        ) {
            stopGame();
            startBtn.textContent = 'Start';
            break;
        }
    }
}

function clearCanvas() {
    ctx.fillStyle = '#eaeaea';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ground
    ctx.fillStyle = '#dedede';
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

function updateDino() {
    if (dinosaur.isJumping) {
        dinosaur.y += dinosaur.velocityY;
        dinosaur.velocityY += dinosaur.gravity;
        const ground = canvas.height - dinosaur.height - groundHeight;
        if (dinosaur.y >= ground) {
            dinosaur.y = ground;
            dinosaur.velocityY = 0;
            dinosaur.isJumping = false;
        }
    }
}

function drawDino() {
    ctx.fillStyle = '#333';
    // body
    ctx.fillRect(dinosaur.x, dinosaur.y + 10, 25, 15);
    // head
    ctx.fillRect(dinosaur.x + 20, dinosaur.y, 15, 15);
    // legs
    ctx.fillRect(dinosaur.x, dinosaur.y + 25, 10, 15);
    ctx.fillRect(dinosaur.x + 15, dinosaur.y + 25, 10, 15);
    // tail
    ctx.beginPath();
    ctx.moveTo(dinosaur.x, dinosaur.y + 15);
    ctx.lineTo(dinosaur.x - 10, dinosaur.y + 10);
    ctx.lineTo(dinosaur.x, dinosaur.y + 20);
    ctx.fill();
}

function draw() {
    clearCanvas();
    updateDino();
    updateObstacles();
    drawDino();
    drawObstacles();
    checkCollisions();

    spawnCounter++;
    if (spawnCounter % 90 === 0) {
        spawnObstacle();
    }

    score += 1;
    scoreDisplay.textContent = score;

    frameId = requestAnimationFrame(draw);
}

function startGame() {
    if (!running) {
        running = true;
        score = 0;
        resetDinoPosition();
        hideGameOver();
        draw();
    }
}

function stopGame() {
    running = false;
    cancelAnimationFrame(frameId);
    showGameOver();
}

function restartGame() {
    obstacles.length = 0;
    spawnCounter = 0;
    hideGameOver();
    startGame();
    startBtn.textContent = 'Stop';
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

restartBtn.addEventListener('click', restartGame);
