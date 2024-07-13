let startTime;
let endTime;
let reactionTime;
let clicked = false;
let attempts = 0;
let totalReactionTime = 0;
const previousTriesElement = document.getElementById('previousTries');
const box = document.getElementById('box');
const timerElement = document.getElementById('timer');
let previousTimes = []; // Array to store previous reaction times

function startTimer() {
    timerElement.textContent = '3'; // Display countdown timer
    let countdown = 3;
    const countdownInterval = setInterval(() => {
        countdown--;
        timerElement.textContent = countdown;
        if (countdown === 0) {
            clearInterval(countdownInterval);
            timerElement.textContent = ''; // Clear the timer
            showBox();
        }
    }, 1000); // 1 second interval
}

function showBox() {
    // Start the timer immediately
    startTime = new Date();
    box.classList.add('green');

    // Position the small box randomly within the big box
    const smallBox = document.querySelector('.small-box');
    const boxRect = box.getBoundingClientRect();
    const smallBoxWidth = smallBox.offsetWidth;
    const smallBoxHeight = smallBox.offsetHeight;
    const maxX = boxRect.width - smallBoxWidth;
    const maxY = boxRect.height - smallBoxHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    smallBox.style.left = `${randomX}px`;
    smallBox.style.top = `${randomY}px`;
    smallBox.style.display = 'block';

    setTimeout(hideBox, Math.floor(Math.random() * 3000) + 1000); // Hide the box after a random time between 1-4 seconds
}

function hideBox() {
    box.classList.remove('green');
    document.querySelector('.small-box').style.display = 'none';
    clicked = false; // Reset clicked flag
}

function handleClick(event) {
    const smallBox = document.querySelector('.small-box');
    const bigBox = document.getElementById('box');
  
    if (!clicked && (event.target === smallBox || event.target === bigBox)) {
      clicked = true;
      endTime = new Date();
      reactionTime = endTime - startTime;
      totalReactionTime += reactionTime;
      attempts++;
      document.getElementById('result').textContent = `Your reaction time: ${reactionTime}ms`;
      previousTimes.push(reactionTime); // Add reaction time to the array
      if (attempts === 4) {
        const averageTime = totalReactionTime / attempts;
        document.getElementById('averageTime').textContent = `Average reaction time: ${averageTime.toFixed(2)}ms`;
      }
      // Display the reaction time in the list
      const tryList = document.getElementById('tryList');
      const listItem = document.createElement('li');
      listItem.textContent = `Try ${attempts}: ${reactionTime}ms`;
      tryList.appendChild(listItem);
      startTimer(); // Start a new round immediately after clicking
    }
  }

function resetGame() {
    box.classList.remove('green');
    document.querySelector('.small-box').style.display = 'none';
    document.getElementById('result').textContent = '';
    document.getElementById('averageTime').textContent = '';
    timerElement.textContent = ''; // Clear the timer
    clicked = false;
    attempts = 0;
    totalReactionTime = 0;
    previousTimes = []; // Clear previous reaction times
  
    // Remove previous times from the HTML element
    const tryList = document.getElementById('tryList');
    while (tryList.firstChild) {
      tryList.removeChild(tryList.firstChild);
    }
  
    // Clear the previousTriesElement
    previousTriesElement.innerHTML = '';
  }

function startGame() {
    startTimer();
    clicked = false; // Reset clicked flag
    document.getElementById('result').textContent = ''; // Clear result message
}

// Update the previous tries list when starting a new game
function updatePreviousTries() {
    previousTriesElement.innerHTML = '<h2>Previous Tries</h2>';
    previousTimes.forEach((time, index) => {
        const previousTry = document.createElement('p');
        previousTry.textContent = `Try ${index + 1}: ${time}ms`;
        previousTriesElement.appendChild(previousTry);
    });
}