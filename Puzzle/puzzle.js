const puzzleContainer = document.getElementById('puzzle');
const startButton = document.getElementById('start');
const shuffleButton = document.getElementById('shuffle');
const congratulationMessage = document.getElementById('congratulation');
const timerElement = document.getElementById('timer');
const stepsElement = document.getElementById('steps');

let puzzle = [];
let emptyIndex = 8;
let timer = 0;
let steps = 0;
let timerInterval = null;
let gameStarted = false;

function initializePuzzle() {
    puzzle = [...Array(8).keys()].map(x => x + 1).concat(null);
    renderPuzzle();
    steps = 0;
    stepsElement.textContent = `Steps: ${steps}`;
    timerElement.textContent = `Time: ${timer}s`;
}

function renderPuzzle() {
    puzzleContainer.innerHTML = '';
    puzzle.forEach((value, index) => {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        if (value) {
            piece.textContent = value;
            if (isMovable(index)) {
                piece.classList.add('movable');
                piece.addEventListener('click', () => movePiece(index));
            } else if (isNearbyMovable(index)) {
                piece.classList.add('nearby-movable');
            }
        } else {
            piece.classList.add('empty');
        }
        puzzleContainer.appendChild(piece);
    });
}

function shufflePuzzle() {
    for (let i = puzzle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [puzzle[i], puzzle[j]] = [puzzle[j], puzzle[i]];
    }
    emptyIndex = puzzle.indexOf(null);
    renderPuzzle();
}

function movePiece(index) {
    if (!gameStarted) {
        startTimer();
        gameStarted = true;
    }
    if (isMovable(index)) {
        [puzzle[emptyIndex], puzzle[index]] = [puzzle[index], puzzle[emptyIndex]];
        emptyIndex = index;
        renderPuzzle();
        steps++;
        stepsElement.textContent = `Steps: ${steps}`;
        checkWin();
    }
}

function isMovable(index) {
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 3, emptyIndex + 3];
    return validMoves.includes(index) && 
           ((emptyIndex % 3 !== 0 && index === emptyIndex - 1) ||
            (emptyIndex % 3 !== 2 && index === emptyIndex + 1) ||
            (index === emptyIndex - 3 || index === emptyIndex + 3));
}

function isNearbyMovable(index) {
    const nearbyMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 3, emptyIndex + 3];
    return nearbyMoves.includes(index);
}

function checkWin() {
    if (puzzle.slice(0, 8).every((value, index) => value === index + 1)) {
        clearInterval(timerInterval);
        congratulationMessage.classList.remove('hidden');
    }
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timer = 0;
    timerElement.textContent = `Time: ${timer}s`;
    timerInterval = setInterval(() => {
        timer++;
        timerElement.textContent = `Time: ${timer}s`;
    }, 1000);
}

startButton.addEventListener('click', () => {
    congratulationMessage.classList.add('hidden');
    shufflePuzzle();
    startButton.disabled = true;
    gameStarted = false;
    steps = 0;
    stepsElement.textContent = `Steps: ${steps}`;
});

shuffleButton.addEventListener('click', () => {
    congratulationMessage.classList.add('hidden');
    shufflePuzzle();
    clearInterval(timerInterval);
    timer = 0;
    timerElement.textContent = `Time: ${timer}s`;
    startButton.disabled = false;
    gameStarted = false;
    steps = 0;
    stepsElement.textContent = `Steps: ${steps}`;
});

initializePuzzle();
