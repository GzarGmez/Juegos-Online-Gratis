// Variables globales
const columns = 7;
const rows = 6;
let currentPlayer = 'X';
let gameActive = true;
const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
let cells = [];
const statusMessage = document.getElementById('status-message'); // Asegúrate de tener el elemento status-message en tu HTML

// Función para inicializar el tablero
function initBoard() {
    // Crear las celdas del tablero
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.column = col;
            board.appendChild(cell);
            cells.push(cell);
        }
    }
    // Asignar evento click a las celdas
    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
    });
}

// Función para manejar clic en una celda
function handleCellClick(clickedCell) {
    const clickedColumn = clickedCell.dataset.column;
    const availableCells = cells.filter(cell => cell.dataset.column === clickedColumn && cell.textContent === '');
    if (availableCells.length > 0 && gameActive) {
        const cellToPlace = availableCells[availableCells.length - 1];
        cellToPlace.textContent = currentPlayer;
        if (checkWin(cellToPlace)) {
            gameActive = false;
            announceWinner();
            setTimeout(() => {
                location.reload();
            }, 2000); // Recargar la página después de 2 segundos
        } else if (checkDraw()) {
            gameActive = false;
            statusMessage.textContent = '¡Empate!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusMessage.textContent = `Turno del jugador ${currentPlayer}`;
        }
    }
}

// Función para verificar si hay un ganador
function checkWin(clickedCell) {
    const row = parseInt(clickedCell.dataset.row);
    const column = parseInt(clickedCell.dataset.column);
    const directions = [
        [0, 1], [1, 0], [1, 1], [-1, 1] // horizontal, vertical, diagonal derecha, diagonal izquierda
    ];
    for (let dir of directions) {
        let count = 1;
        for (let i = 1; i <= 3; i++) {
            const checkRow = row + dir[0] * i;
            const checkColumn = column + dir[1] * i;
            if (checkRow >= 0 && checkRow < rows && checkColumn >= 0 && checkColumn < columns) {
                const adjacentCell = cells.find(cell => cell.dataset.row == checkRow && cell.dataset.column == checkColumn);
                if (adjacentCell && adjacentCell.textContent === currentPlayer) {
                    count++;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        if (count >= 4) {
            return true;
        }
    }
    return false;
}

// Función para verificar si hay empate
function checkDraw() {
    return cells.every(cell => cell.textContent !== '');
}

// Función para anunciar al ganador
function announceWinner() {
    statusMessage.textContent = `¡Jugador ${currentPlayer} ha ganado!`;
}

// Función para reiniciar el juego
function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
    });
    statusMessage.textContent = `Turno del jugador ${currentPlayer}`;
}

// Asignar evento al botón de reinicio
resetButton.addEventListener('click', resetGame);

// Iniciar el juego por primera vez
initBoard();
