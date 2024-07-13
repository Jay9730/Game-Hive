const words = [
    "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew",
    "imbe", "jackfruit", "kiwi", "lime", "mango", "nectarine", "orange", "papaya",
    "quince", "raspberry", "strawberry", "tangerine", "ugli", "vanilla", "watermelon",
    "xigua", "yellowfruit", "zucchini","almond", "bread", "carrot", "donut", "egg", "fish", "ginger", "honey", "ice",
    "jam", "kale", "lemon", "melon", "nut", "oat", "pea", "quinoa", "rice", "spinach",
    "tea", "udon", "vinegar", "wheat", "yogurt", "zest"
];


let currentWord = '';
let score = 0;
let time = 60;
let timerInterval;

const wordContainer = document.getElementById('word-container');
const inputField = document.getElementById('input-field');
const scoreValue = document.getElementById('score-value');
const timeValue = document.getElementById('time');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function displayNewWord() {
    currentWord = getRandomWord();
    wordContainer.textContent = currentWord;
    inputField.value = '';
}

inputField.addEventListener('input', () => {
    if (inputField.value === currentWord) {
        score++;
        scoreValue.textContent = score;
        displayNewWord();
    }
});

function startGame() {
    score = 0;
    time = 60;
    scoreValue.textContent = score;
    timeValue.textContent = time;
    displayNewWord();
    inputField.disabled = false;
    inputField.focus();

    // Clear previous interval to prevent multiple intervals running simultaneously
    clearInterval(timerInterval);

    // Start the timer interval
    timerInterval = setInterval(() => {
        time--;
        timeValue.textContent = time;
        if (time === 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    inputField.disabled = true;
    alert(`Game over! Your score is ${score}`);
}

function restartGame() {
    clearInterval(timerInterval);
    timeValue.textContent = time;
    inputField.value = '';
    scoreValue.textContent = '0';
    inputField.focus();
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

// Disable input field and set focus on the start button initially
window.onload = function() {
    inputField.disabled = true;
    startButton.focus();
};
