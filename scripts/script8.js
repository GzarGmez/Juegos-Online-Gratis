// Obtener elementos del DOM
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const message = document.getElementById('message');

// Generar número aleatorio entre 1 y 100
const targetNumber = Math.floor(Math.random() * 100) + 1;
console.log(`Número a adivinar: ${targetNumber}`);

// Contador de intentos
let attempts = 0;

// Función para verificar el número ingresado
function checkGuess() {
    attempts++;
    const userGuess = parseInt(guessInput.value);

    if (userGuess === targetNumber) {
        showMessage(`¡Felicidades! Adivinaste el número ${targetNumber} en ${attempts} intentos.`);
        guessInput.disabled = true;
        guessButton.disabled = true;
        setTimeout(() => {
            window.location.reload();
        }, 3000); // Recarga la página después de 3 segundos
    } else if (userGuess < targetNumber) {
        showMessage(`Intenta con un número mayor que ${userGuess}.`);
    } else {
        showMessage(`Intenta con un número menor que ${userGuess}.`);
    }

    guessInput.value = '';
    guessInput.focus();
}

// Función para mostrar mensajes
function showMessage(msg) {
    message.textContent = msg;
}

// Event listener para el botón de adivinar
guessButton.addEventListener('click', checkGuess);

// Event listener para la tecla Enter en el input
guessInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});
