// Obtener elementos del DOM
const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');
const resultDiv = document.getElementById('result');

// Variable para controlar si el juego está activo
let gameActive = true;

// Event listeners para cada opción
rockButton.addEventListener('click', () => playGame('rock'));
paperButton.addEventListener('click', () => playGame('paper'));
scissorsButton.addEventListener('click', () => playGame('scissors'));

// Función principal del juego
function playGame(playerChoice) {
    if (!gameActive) return; // Salir si el juego ya no está activo

    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    // Determinar resultado
    if (playerChoice === computerChoice) {
        showResult("¡Empate!");
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        showResult(`¡Ganaste! El ordenador eligió ${translateToSpanish(computerChoice)}.`);
        endGame();
    } else {
        showResult(`¡Perdiste! El ordenador eligió ${translateToSpanish(computerChoice)}.`);
        endGame();
    }
}

// Función para traducir las opciones a español
function translateToSpanish(choice) {
    switch (choice) {
        case 'rock':
            return 'piedra';
        case 'paper':
            return 'papel';
        case 'scissors':
            return 'tijeras';
        default:
            return choice;
    }
}

// Mostrar resultado en el DOM
function showResult(message) {
    resultDiv.textContent = message;
}

// Función para finalizar el juego
function endGame() {
    gameActive = false; // Desactivar el juego
    disableButtons(); // Deshabilitar botones
    setTimeout(() => {
        location.reload(); // Recargar la página después de 2 segundos
    }, 2000);
}

// Deshabilitar botones
function disableButtons() {
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
}
