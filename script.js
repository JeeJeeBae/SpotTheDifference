function horseSet() {
  const leftBoard = document.querySelector(".left-board");
  const rightBoard = document.querySelector(".right-board");

  // Create image elements and set their src attributes
  const leftImage = document.createElement("img");
  leftImage.src = "horse-left.png";

  const rightImage = document.createElement("img");
  rightImage.src = "horse-right.png";

  // Append images to respective boards
  leftBoard.appendChild(leftImage);
  rightBoard.appendChild(rightImage);
}

function boxClick(event) {
  const resultDisplay = document.getElementById("result");
  const clickedBox = event.target.closest(".box");

  // Get the ID of the clicked box
  const boxId = clickedBox.querySelector("div").id;

  // Check if the clicked box is already clicked
  if (clickedBox.classList.contains("clicked")) {
    return; // Do nothing if the box is already clicked
  }

  // Add 'clicked' class to the clicked box
  clickedBox.classList.add("clicked");

  // Check if the clicked box ID is correct or incorrect
  if (correctBox(boxId)) {
    resultDisplay.textContent = "Correct!";
    clickedBox.classList.add("correct");

    const correctBoxes = document.querySelectorAll(".correct");
    const numCorrectBoxes = correctBoxes.length;
    const tickerId = `ticker${numCorrectBoxes}`;
    const correctTicker = document.getElementById(tickerId);
    correctTicker.style.backgroundColor = "#00d588";

    if (allBoxesFound()) {
      clearInterval(countdown); //stop the timer
    }
  } else {
    resultDisplay.textContent = "Nope, not there!";
  }

  if (allBoxesFound()) {
    resultDisplay.textContent = "Well done! You found all three.";
  }
}

function allBoxesFound() {
  // Get all correct box elements
  const correctBoxes = document.querySelectorAll(".correct");
  // Define the number of correct boxes to be found
  const numCorrectBoxes = 3;
  // Check if the number of found correct boxes matches the total number of correct boxes
  //   return correctBoxes.length === numCorrectBoxes;

  const foundAllBoxes = correctBoxes.length === numCorrectBoxes;

  if (foundAllBoxes) {
    const startButton = document.getElementById("myButton");
    startButton.disabled = false; // Re-enable the button
    startButton.style.backgroundColor = ""; // Reset button color
    startButton.textContent = "Next"; // Change button text
  }

  return foundAllBoxes;
}

function correctBox(boxId) {
  // Define the IDs of correct boxes
  const correctBoxIds = ["box33", "box40", "box76"]; // Add more correct box IDs as needed

  // check if the clicked box ID is in the list of correct box IDs
  return correctBoxIds.includes(boxId);
}

// Get all box elements
const boxes = document.querySelectorAll(".box");

// Add click event listener to each box
boxes.forEach(function (box) {
  box.addEventListener("click", boxClick);
});

let countdown; // Declaration of the countdown variable

function timer() {
  const resultDisplay = document.getElementById("result");
  const timerDisplay = document.getElementById("timer");
  const myButton = document.getElementById("myButton");

  let secondsLeft = 30;

  //disable the button and change its color to grey:
  myButton.disabled = true;
  myButton.style.backgroundColor = "#D9D9D9";

  countdown = setInterval(function () {
    secondsLeft--;
    timerDisplay.textContent = `TIME LEFT: ${secondsLeft} SECONDS`;

    if (secondsLeft === 10) {
      timerDisplay.style.color = "red";
    }

    if (secondsLeft === 0) {
      clearInterval(countdown);
      timerDisplay.textContent = "Time's up!";
      myButton.disabled = false; // Re-enable button after the countdown ends
      myButton.style.backgroundColor = ""; //reset button color
    }
  }, 1000);

  horseSet(); // Call function to display images
  boxClick();
}

document.getElementById("myButton").addEventListener("click", timer);

document.getElementById("myButton").addEventListener("click", function () {
  this.textContent = "Next";
});
