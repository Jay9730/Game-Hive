document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (index) => {
        if (gameState[index] !== '' || !gameActive) return;

        gameState[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        if (checkWin()) {
            message.textContent = `${currentPlayer} wins!`;
            message.classList.add('winner');
            markWinningCells();
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            message.textContent = 'Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `${currentPlayer}'s turn`;
    };

    const checkWin = () => {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                gameState[a] !== '' &&
                gameState[a] === gameState[b] &&
                gameState[a] === gameState[c]
            ) {
                return true;
            }
        }
        return false;
    };

    const markWinningCells = () => {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                gameState[a] !== '' &&
                gameState[a] === gameState[b] &&
                gameState[a] === gameState[c]
            ) {
                cells[a].classList.add('winning-cell');
                cells[b].classList.add('winning-cell');
                cells[c].classList.add('winning-cell');
                break;
            }
        }
    };

    const resetGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winning-cell');
        });
        message.textContent = `${currentPlayer}'s turn`;
        message.classList.remove('winner');
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    resetButton.addEventListener('click', resetGame);
});
