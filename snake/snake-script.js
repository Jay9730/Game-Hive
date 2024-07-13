document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const startButton = document.getElementById('start');
    const resetButton = document.getElementById('reset');
    const scoreDisplay = document.getElementById('score');

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 0, y: 0 };
    let dx = 0;
    let dy = 0;
    let intervalId;
    let score = 0;

    const resetGame = () => {
        clearInterval(intervalId);
        snake = [{ x: 10, y: 10 }];
        dx = 0;
        dy = 0;
        score = 0;
        scoreDisplay.textContent = 'Score: 0';
        render();
    };

    const startGame = () => {
        intervalId = setInterval(() => {
            moveSnake();
            render();
        }, 100);
    };

    const moveSnake = () => {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            generateFood();
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        } else {
            snake.pop();
        }
        if (checkCollision() || checkOutOfBounds()) {
            clearInterval(intervalId);
            alert('Game Over! Your final score: ' + score);
            resetGame();
        }
    };

    const generateFood = () => {
        const x = Math.floor(Math.random() * (gameBoard.offsetWidth / 10)) * 10;
        const y = Math.floor(Math.random() * (gameBoard.offsetHeight / 10)) * 10;
        food = { x, y };
    };

    const checkCollision = () => {
        return snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
    };

    const checkOutOfBounds = () => {
        return (
            snake[0].x < 0 ||
            snake[0].x >= gameBoard.offsetWidth ||
            snake[0].y < 0 ||
            snake[0].y >= gameBoard.offsetHeight ||
            (snake[0].x + 10 > gameBoard.offsetWidth) || // Adjusted boundary for snake size
            (snake[0].y + 10 > gameBoard.offsetHeight) // Adjusted boundary for snake size
        );
    };
    
    const render = () => {
        gameBoard.innerHTML = '';
        snake.forEach(segment => {
            const snakeElement = document.createElement('div');
            snakeElement.classList.add('snake');
            snakeElement.style.left = segment.x + 'px';
            snakeElement.style.top = segment.y + 'px';
            gameBoard.appendChild(snakeElement);
        });
        const foodElement = document.createElement('div');
        foodElement.classList.add('food');
        foodElement.style.left = food.x + 'px';
        foodElement.style.top = food.y + 'px';
        gameBoard.appendChild(foodElement);
    };

    document.addEventListener('keydown', event => {
        if (event.key === 'ArrowUp' && dy !== 10) {
            dx = 0;
            dy = -10;
        }
        if (event.key === 'ArrowDown' && dy !== -10) {
            dx = 0;
            dy = 10;
        }
        if (event.key === 'ArrowLeft' && dx !== 10) {
            dx = -10;
            dy = 0;
        }
        if (event.key === 'ArrowRight' && dx !== -10) {
            dx = 10;
            dy = 0;
        }
    });

    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);
});
