const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
const size = 8; // tamaño del tablero
const mines = 10; // número de minas

let mineLocations = []; // ubicaciones de las minas
let cells = []; // celdas del tablero
let gameover = false;

// Inicialización del tablero
function initBoard() {
    // Crear celdas
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-id', i);
        board.appendChild(cell);
        cells.push(cell);

        // Manejar eventos de clic
        cell.addEventListener('click', () => {
            if (!gameover) {
                clickCell(cell);
            }
        });
    }

    // Colocar minas aleatoriamente
    let minesPlaced = 0;
    while (minesPlaced < mines) {
        const randomCell = Math.floor(Math.random() * (size * size));
        if (!mineLocations.includes(randomCell)) {
            mineLocations.push(randomCell);
            minesPlaced++;
        }
    }
}

// Manejar clic en una celda
function clickCell(cell) {
    const id = parseInt(cell.getAttribute('data-id'));
    if (mineLocations.includes(id)) {
        revealMines();
        gameOver();
    } else {
        const mineCount = countAdjacentMines(id);
        cell.classList.add('clicked');
        if (mineCount > 0) {
            cell.textContent = mineCount;
        } else {
            // Si no hay minas adyacentes, revelar vecinos
            revealNeighbors(id);
        }
    }
    checkWin();
}

// Contar minas adyacentes a una celda
function countAdjacentMines(id) {
    let count = 0;
    const neighbors = getNeighbors(id);
    neighbors.forEach(neighbor => {
        if (mineLocations.includes(neighbor)) {
            count++;
        }
    });
    return count;
}

// Obtener vecinos de una celda
function getNeighbors(id) {
    const neighbors = [];
    const row = Math.floor(id / size);
    const col = id % size;

    // Vecinos directos
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const neighborRow = row + i;
            const neighborCol = col + j;
            if (neighborRow >= 0 && neighborRow < size && neighborCol >= 0 && neighborCol < size) {
                neighbors.push(neighborRow * size + neighborCol);
            }
        }
    }

    return neighbors;
}

// Revelar todas las minas al finalizar el juego
function revealMines() {
    mineLocations.forEach(mine => {
        cells[mine].classList.add('mine');
    });
}

// Revelar vecinos de una celda
function revealNeighbors(id) {
    const neighbors = getNeighbors(id);
    neighbors.forEach(neighbor => {
        const neighborCell = cells[neighbor];
        if (!neighborCell.classList.contains('clicked')) {
            clickCell(neighborCell);
        }
    });
}

// Verificar si se ganó el juego
function checkWin() {
    let clickedCount = 0;
    cells.forEach(cell => {
        if (cell.classList.contains('clicked')) {
            clickedCount++;
        }
    });
    if (clickedCount === size * size - mines) {
        alert('¡Felicidades! Has ganado el juego.');
        gameOver();
    }
}

// Finalizar el juego
function gameOver() {
    gameover = true;
    resetButton.style.display = 'block';

    // Reiniciar la página después de 2 segundos al perder
    setTimeout(() => {
        window.location.reload();
    }, 2000);
}

// Reiniciar el juego
function resetGame() {
    mineLocations = [];
    cells = [];
    gameover = false;
    board.innerHTML = '';
    resetButton.style.display = 'none';
    initBoard();
}

// Event listener para reiniciar el juego
resetButton.addEventListener('click', resetGame);

// Iniciar el juego por primera vez
initBoard();
