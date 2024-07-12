const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
let score = 0;
let isJumping = false;
let gravity = 0.9;

function jump() {
    if (isJumping) return;
    isJumping = true;
    let position = 0;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                position -= 5;
                dino.style.bottom = position + 'px';
            }, 20);
        }
        position += 30;
        dino.style.bottom = position + 'px';
    }, 20);
}

function generateObstacle() {
    let obstaclePosition = 1000;
    let randomTime = Math.random() * 4000;

    let obstacleInterval = setInterval(() => {
        if (obstaclePosition < -60) {
            clearInterval(obstacleInterval);
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
            generateObstacle();
        } else if (obstaclePosition > 0 && obstaclePosition < 60 && parseInt(dino.style.bottom) < 60) {
            alert('Game Over! Your final score is ' + score);
            clearInterval(obstacleInterval);
            location.reload();
        }
        obstaclePosition -= 10;
        obstacle.style.left = obstaclePosition + 'px';
    }, 20);
}

document.addEventListener('keydown', event => {
    if (event.key === ' ') {
        jump();
    }
});

document.addEventListener('click', jump);

generateObstacle();
