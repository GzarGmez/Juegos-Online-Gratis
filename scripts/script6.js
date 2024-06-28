document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    let flippedCards = [];
    let pairsFound = 0;
    let canFlip = true;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (!canFlip || card.classList.contains('flipped')) return;

            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                canFlip = false;
                setTimeout(() => {
                    const [firstCard, secondCard] = flippedCards;
                    if (firstCard.dataset.card === secondCard.dataset.card) {
                        firstCard.classList.add('matched');
                        secondCard.classList.add('matched');
                        pairsFound++;
                        if (pairsFound === 4) {
                            alert('¡Felicidades! Has encontrado todos los pares.');
                        }
                    } else {
                        firstCard.classList.remove('flipped');
                        secondCard.classList.remove('flipped');
                    }
                    flippedCards = [];
                    canFlip = true;
                }, 1000);
            }
        });
    });

    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', () => {
        cards.forEach(card => {
            card.classList.remove('flipped', 'matched');
        });
        pairsFound = 0;
    });
});
