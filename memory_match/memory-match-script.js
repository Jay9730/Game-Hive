document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const resetButton = document.getElementById('reset');
    const shuffleButton = document.getElementById('shuffle');
    const message = document.getElementById('message');
    let flippedCards = [];
    let matchedCards = [];

    // Shuffle function
    const shuffleCards = () => {
        cards.forEach(card => {
            const randomPos = Math.floor(Math.random() * cards.length);
            card.style.order = randomPos;
        });
    };

    const resetGame = () => {
        resetCards();
        message.textContent = '';
    };

    const resetCards = () => {
        flippedCards = [];
        matchedCards = [];
        cards.forEach(card => {
            card.classList.remove('matched', 'open');
        });
    };

    const checkMatch = () => {
        const [firstCard, secondCard] = flippedCards;
        if (firstCard.dataset.framework === secondCard.dataset.framework) {
            matchedCards.push(firstCard, secondCard);
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            flippedCards = [];
            if (matchedCards.length === cards.length) {
                message.textContent = 'Congratulations! You won!';
            }
        } else {
            setTimeout(() => {
                flippedCards.forEach(card => card.classList.remove('open'));
                flippedCards = [];
            }, 1000);
        }
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
                card.classList.add('open');
                flippedCards.push(card);
                if (flippedCards.length === 2) {
                    checkMatch();
                }
            }
        });
    });

    resetButton.addEventListener('click', resetGame);
    shuffleButton.addEventListener('click', shuffleCards);
});
