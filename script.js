// Get necessary elements from the DOM
const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('time');
const gameBoard = document.getElementById('gameBoard');
const finalMessage = document.getElementById('finalMessage');
const holes = document.querySelectorAll('.hole');
const images = document.querySelectorAll('.hole img');

let score = 0;
let timeLeft = 30;
let isGameActive = false;
let countdownInterval;
let gameTimer;



// Function to handle clicking on the images
// Function to handle clicking on the images
function handleImageClick() {
  if (isGameActive && this.style.display !== 'none') {
    // Remove border from all images
    images.forEach(image => {
      image.style.border = 'none';
    });
    // Add red border to the clicked image
    this.style.border = '2px solid #ff6b6b';
    score++;
    scoreDisplay.textContent = score;
    this.style.display = 'none'; // Hide the clicked image

    // Play the click sound
    const clickSound = document.getElementById('clickSound');
    clickSound.play();
  }
}



// Function to start the game
function startGame() {
  if (!isGameActive) {
    score = 0;
    scoreDisplay.textContent = score;
    timeLeft = 30;
    timerDisplay.textContent = timeLeft;
    finalMessage.style.display = 'none';

    isGameActive = true;


    // Start the countdown timer
    gameTimer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft === 0) {
        endGame();
      }
    }, 1000);

    // Start showing images at random intervals
    countdownInterval = setInterval(() => {
      const randomHole = Math.floor(Math.random() * holes.length);
      const randomImage = images[randomHole];
      if (randomImage.style.display === 'none') {
        randomImage.style.display = 'block'; // Show the image
        setTimeout(() => {
          randomImage.style.display = 'none'; // Hide the image
        }, 1000); // Image display duration
      }
    }, 1500); // Interval between images
  }
}
// 

// Function to end the game
function endGame() {
  isGameActive = false;
  clearInterval(countdownInterval);
  clearInterval(gameTimer);


  // Display final message based on the score
  if (score <10 ) {
    finalMessage.textContent = "Better luck next time!";
  } else if (score < 15) {
    finalMessage.textContent = "Nice try!";
  } else {
    finalMessage.textContent = "You're a FaceBomp champion!";
  }
  finalMessage.style.display = 'block';
  // Play the end sound
  if (score > 15) {
    const endSound = new Audio('y2453.wav');
    endSound.play();
  }
  
}


// Event listeners
startButton.addEventListener('click', startGame);
images.forEach(image => image.addEventListener('click', handleImageClick));





