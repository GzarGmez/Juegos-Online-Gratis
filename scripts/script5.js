// Constantes y variables
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const resetButton = document.getElementById("resetButton");
const scoreElement = document.getElementById("score");

const grid = 20;
let snake = [{ x: 100, y: 100 }];
let food = { x: 200, y: 200 };
let dx = grid;
let dy = 0;
let score = 0;
let gameStarted = false; // Variable para controlar el estado del juego

// Función para dibujar el tablero y objetos
function draw() {
    // Dibujar fondo del tablero
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f9f9f9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar serpiente
    ctx.fillStyle = "green";
    snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, grid, grid);
    });

    // Dibujar comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, grid, grid);

    // Movimiento de la serpiente
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Verificar colisión con comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }

    // Verificar colisión con paredes
    if (head.x >= canvas.width || head.x < 0 || head.y >= canvas.height || head.y < 0) {
        gameOver();
    }

    // Verificar colisión con el propio cuerpo
    if (isCollision()) {
        gameOver();
    }
}

// Función para generar comida en posiciones aleatorias
function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
    food.y = Math.floor(Math.random() * (canvas.height / grid)) * grid;

    // Verificar que la comida no aparezca sobre la serpiente
    snake.forEach((segment) => {
        if (food.x === segment.x && food.y === segment.y) {
            generateFood();
        }
    });
}

// Función para manejar el evento de teclado
function changeDirection(event) {
    const key = event.key;
    if (!gameStarted) {
        gameStarted = true; // Iniciar el juego solo la primera vez que se presiona una tecla
        startGame(); // Llamar a la función de inicio del juego
        document.removeEventListener('keydown', changeDirection); // Detener el escucha de eventos después de iniciar el juego
    }
    if (key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -grid;
    } else if (key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = grid;
    } else if (key === "ArrowLeft" && dx === 0) {
        dx = -grid;
        dy = 0;
    } else if (key === "ArrowRight" && dx === 0) {
        dx = grid;
        dy = 0;
    }
}

// Función para verificar colisión con el propio cuerpo
function isCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

// Función para manejar el fin del juego
function gameOver() {
    alert(`¡Juego terminado! Puntaje final: ${score}`);
    resetGame();
}

// Función para reiniciar el juego
function resetGame() {
    snake = [{ x: 100, y: 100 }];
    dx = grid;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    generateFood();
    gameStarted = false; // Reiniciar el estado del juego

    // Volver a agregar el event listener para iniciar el juego
    document.addEventListener('keydown', changeDirection);
}

// Event listeners
document.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);

// Mostrar mensaje de inicio
const startMessage = document.createElement('div');
startMessage.id = 'startMessage';
startMessage.textContent = 'Presiona cualquier tecla para iniciar el juego';
startMessage.style.fontSize = '24px';
startMessage.style.fontWeight = 'bold';
startMessage.style.marginTop = '20px';
document.body.appendChild(startMessage);

// Iniciar el juego
generateFood();
setInterval(draw, 100);
