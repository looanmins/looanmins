const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let score = 0;
document.getElementById('score').textContent = `Score: ${score}`;

const player = {
    x: canvas.width / 2 - 15,
    y: canvas.height - 30,
    width: 30,
    height: 30,
    dx: 5,
    dy: 5,
    color: '#00ff00'
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 3,
    dy: 3,
    color: '#ff0000'
};

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function movePlayer() {
    if (keys['ArrowRight'] && player.x + player.width < canvas.width) {
        player.x += player.dx;
    }
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.dx;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1;
    }

    if (ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    if (ball.y + ball.radius > canvas.height) {
        ball.dy *= -1;
        score = 0;
        document.getElementById('score').textContent = `Score: ${score}`;
    }

    if (
        ball.y + ball.radius > player.y &&
        ball.x > player.x &&
        ball.x < player.x + player.width
    ) {
        ball.dy *= -1;
        score += 10;
        document.getElementById('score').textContent = `Score: ${score}`;
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function gameLoop() {
    clearCanvas();
    drawPlayer();
    drawBall();
    movePlayer();
    moveBall();
    requestAnimationFrame(gameLoop);
}

gameLoop();
