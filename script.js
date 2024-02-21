function horseSet() {
  const leftImage = document.getElementById("horse-left");
  const rightImage = document.getElementById("horse-right");
  const resultDisplay = document.getElementById("result");
  const timerDisplay = document.getElementById("timer");
  const startButton = document.getElementById("myButton");

  //   // Show the second image
  //   rightImage.style.display = "block";

  // Start the 30-second timer
  let secondsLeft = 30;

  const countdown = setInterval(function () {
    secondsLeft--;
    timerDisplay.textContent = `Time left: ${secondsLeft} seconds`;

    if (secondsLeft < 0) {
      clearInterval(countdown);
      timerDisplay.textContent = "Time's up!";
      startButton.disabled = false;
      resultDisplay.textContent = "Game over!";
    }
  }, 1000);

  let differencesFound = 0; // Track the number of differences found

  // Compare images when clicked
  leftImage.addEventListener("click", function () {
    differencesFound++;
    if (differencesFound === 3) {
      resultDisplay.textContent = "You found all differences!";
      clearInterval(countdown);
      resultDisplay.textContent = "Game over!";
      startButton.disabled = false;
    } else {
      leftImage.classList.add("incorrect");
      resultDisplay.textContent = "Incorrect! Try again.";
    }
  });

  rightImage.addEventListener("click", function () {
    differencesFound++;
    if (differencesFound === 3) {
      resultDisplay.textContent = "You found all differences!";
      clearInterval(countdown);
      resultDisplay.textContent = "Game over!";
      startButton.disabled = false;
    } else {
      rightImage.classList.add("incorrect");
      resultDisplay.textContent = "Incorrect! Try again.";
    }
    startButton.disabled = false;
  });

  // Disable the start button once the game starts
  startButton.disabled = true;
}

// Add event listener to start button
document.getElementById("myButton").addEventListener("click", horseSet);

// function startGame() {
//     const girlLeft = document.getElementById('image1');
//     const girlRight = document.getElementById('image2');
//   const timerDisplay = document.getElementById("timer");
//   const gameStatusDisplay = document.getElementById("status");
//   const startButton = document.getElementById("myButton");

//   let timeLeft = 30; // Set the initial time (in seconds)

//   // Update the timer every second
//   const intervalId = setInterval(function () {
//     timeLeft--;
//     timerDisplay.textContent = timeLeft;

//     if (timeLeft === 0) {
//       clearInterval(intervalId); // Stop the timer when it reaches zero
//     }
//   }, 1000);

//   // Disable the start button once the game starts
//   startButton.disabled = true;
// }

// // Add event listener to start button
// document.getElementById("myButton").addEventListener("click", startGame);
// document.getElementById("myButton").addEventListener("click", function () {
//   this.textContent = "Next";
// });

// function numDiff() {}

// function timer() {}
