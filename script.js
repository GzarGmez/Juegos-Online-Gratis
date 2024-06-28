const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const startScreen = document.getElementById('startScreen');
const enemyCounter = document.getElementById('enemyCounter'); // Elemento para mostrar el contador

let playerX = 285;
let playerY = 285;
const playerSpeed = 5;
const enemies = [];
const enemySpeed = 1;
let gameOver = false;
let gameStarted = false;
let enemyCount = 0; // Contador de enemigos

document.addEventListener('keydown', startGame);

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        startScreen.style.display = 'none';
        document.removeEventListener('keydown', startGame);
        document.addEventListener('keydown', movePlayer);
        setInterval(() => {
            createEnemy();
        }, 2000);
        setInterval(() => {
            moveEnemies();
        }, 30);
    }
}

function movePlayer(event) {
    if (gameOver) return;
    switch(event.key) {
        case 'ArrowUp':
            if (playerY > 0) playerY -= playerSpeed;
            break;
        case 'ArrowDown':
            if (playerY < gameArea.clientHeight - player.clientHeight) playerY += playerSpeed;
            break;
        case 'ArrowLeft':
            if (playerX > 0) playerX -= playerSpeed;
            break;
        case 'ArrowRight':
            if (playerX < gameArea.clientWidth - player.clientWidth) playerX += playerSpeed;
            break;
    }
    player.style.top = playerY + 'px';
    player.style.left = playerX + 'px';
}

function createEnemy() {
    if (gameOver) return;
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.width = '20px';
    enemy.style.height = '20px';
    enemy.style.backgroundColor = 'blue';
    enemy.style.position = 'absolute';
    enemy.style.top = Math.random() * (gameArea.clientHeight - 20) + 'px';
    enemy.style.left = Math.random() * (gameArea.clientWidth - 20) + 'px';
    gameArea.appendChild(enemy);
    enemies.push(enemy);
    enemyCount++; // Incrementar contador de enemigos
    updateEnemyCounter(); // Actualizar visualización del contador
}

function moveEnemies() {
    if (gameOver) return;
    enemies.forEach(enemy => {
        const dx = playerX - parseFloat(enemy.style.left);
        const dy = playerY - parseFloat(enemy.style.top);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 20) {
            gameOver = true;
            alert('¡Perdiste!');
            setTimeout(() => {
                window.location.reload();
            }, 1000); // Recarga la página después de 1 segundo
        }

        enemy.style.left = parseFloat(enemy.style.left) + (dx / distance) * enemySpeed + 'px';
        enemy.style.top = parseFloat(enemy.style.top) + (dy / distance) * enemySpeed + 'px';
    });
}

function updateEnemyCounter() {
    enemyCounter.textContent = `Enemigos: ${enemyCount}`;
}
