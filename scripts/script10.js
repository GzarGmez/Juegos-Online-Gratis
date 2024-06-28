document.addEventListener('DOMContentLoaded', () => {
    const maze = document.getElementById('maze');
    const player = document.createElement('div');
    player.className = 'player';
    maze.appendChild(player);

    const exit = document.createElement('div');
    exit.className = 'exit';
    maze.appendChild(exit);

    const cells = [];
    const mazeWidth = 20; // Número de celdas horizontales
    const mazeHeight = 20; // Número de celdas verticales

    // Generar laberinto
    for (let row = 0; row < mazeHeight; row++) {
        for (let col = 0; col < mazeWidth; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (row === 0 || row === mazeHeight - 1 || col === 0 || col === mazeWidth - 1 || (row % 2 === 0 && col % 2 === 0)) {
                cell.className += ' wall';
            }
            maze.appendChild(cell);
            cells.push(cell);
        }
    }

    // Mover jugador con las teclas
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        let top = parseInt(player.style.top) || 0;
        let left = parseInt(player.style.left) || 0;
        const step = 20; // Tamaño del paso de movimiento

        switch (key) {
            case 'ArrowUp':
                if (!isWallCollision(top - step, left)) {
                    player.style.top = `${Math.max(top - step, 0)}px`;
                }
                break;
            case 'ArrowDown':
                if (!isWallCollision(top + step, left)) {
                    player.style.top = `${Math.min(top + step, maze.clientHeight - player.offsetHeight)}px`;
                }
                break;
            case 'ArrowLeft':
                if (!isWallCollision(top, left - step)) {
                    player.style.left = `${Math.max(left - step, 0)}px`;
                }
                break;
            case 'ArrowRight':
                if (!isWallCollision(top, left + step)) {
                    player.style.left = `${Math.min(left + step, maze.clientWidth - player.offsetWidth)}px`;
                }
                break;
        }

        // Comprobar si el jugador ha llegado a la salida
        if (isExitCollision()) {
            setTimeout(() => {
                alert('¡Felicidades! Has encontrado la salida del laberinto.');
                resetPlayerPosition();
                setTimeout(() => {
                    window.location.reload(); // Recargar la página después de 2 segundos
                }, 2000);
            }, 200);
        }
    });

    // Función para comprobar colisión con las paredes
    function isWallCollision(top, left) {
        const wallCells = document.getElementsByClassName('wall');
        for (let cell of wallCells) {
            const rect = cell.getBoundingClientRect();
            if (
                top >= rect.top &&
                top <= rect.bottom &&
                left >= rect.left &&
                left <= rect.right
            ) {
                return true;
            }
        }
        return false;
    }

    // Función para comprobar colisión con la salida
    function isExitCollision() {
        const exitRect = exit.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();
        return (
            playerRect.top >= exitRect.top &&
            playerRect.bottom <= exitRect.bottom &&
            playerRect.left >= exitRect.left &&
            playerRect.right <= exitRect.right
        );
    }

    // Función para reiniciar la posición del jugador
    function resetPlayerPosition() {
        player.style.top = '10px';
        player.style.left = '10px';
    }
});
