// Variables globales
let currentPlayer = 'X';
let gameActive = true;
const board = document.getElementById('board');
const cells = document.getElementsByTagName('td');
const statusMessage = document.getElementById('status-message');
const resetButton = document.getElementById('resetButton');

// Función para manejar clic en una celda
function handleCellClick(cell) {
    const cellIndex = parseInt(cell.id.replace('cell-', ''));
    
    // Verificar si la celda está vacía y el juego está activo
    if (cells[cellIndex].textContent === '' && gameActive) {
        cells[cellIndex].textContent = currentPlayer;
        if (checkWin()) {
            gameActive = false;
            statusMessage.textContent = `¡Jugador ${currentPlayer} ha ganado!`;
            endGame();
        } else if (checkDraw()) {
            gameActive = false;
            statusMessage.textContent = '¡Empate!';
            endGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusMessage.textContent = `Turno del jugador ${currentPlayer}`;
        }
    }
}

// Función para verificar si hay un ganador
function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winConditions.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

// Función para verificar si hay empate
function checkDraw() {
    return [...cells].every(cell => {
        return cell.textContent !== '';
    });
}

// Función para reiniciar el juego
function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    statusMessage.textContent = `Turno del jugador ${currentPlayer}`;
    [...cells].forEach(cell => {
        cell.textContent = '';
    });
}

// Función para terminar el juego y reiniciar la página después de 2 segundos
function endGame() {
    setTimeout(() => {
        resetGame();
        window.location.reload();
    }, 2000);
}

// Asignar eventos a las celdas y al botón de reinicio
[...cells].forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell));
});

resetButton.addEventListener('click', resetGame);

// Iniciar el juego por primera vez
resetGame();
