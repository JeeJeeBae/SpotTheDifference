let currentImageSetIndex = 0;

const imageSets = [
  {
    leftImageSrc: "climber-left.png",
    rightImageSrc: "climber-right.png",
    correctBoxIds: ["box4", "box38", "box39", "box48", "box49", "box77"],
  },
  {
    leftImageSrc: "horse-left.png",
    rightImageSrc: "horse-right.png",
    correctBoxIds: ["box33", "box40", "box76"],
  },
  {
    leftImageSrc: "pirate-left.png",
    rightImageSrc: "pirate-right.png",
    correctBoxIds: ["box94", "box67", "box44"],
  },
  {
    leftImageSrc: "boy-left.png",
    rightImageSrc: "boy-right.png",
    correctBoxIds: ["box36", "box42", "box43", "box88", "box89"],
  },
  {
    leftImageSrc: "camp-left.png",
    rightImageSrc: "camp-right.png",
    correctBoxIds: ["box37", "box47", "box83", "box80", "box90"],
  },
  {
    leftImageSrc: "girl-left.png",
    rightImageSrc: "girl-right.png",
    correctBoxIds: ["box23", "box39", "box86"],
  },
  {
    leftImageSrc: "scooter-left.png",
    rightImageSrc: "scooter-right.png",
    correctBoxIds: ["box24", "box68", "box76", "box86"],
  },
];

function mainImageSet(imageSet) {
  const leftBoard = document.querySelector(".left-board");
  const rightBoard = document.querySelector(".right-board");

  //clear existing images:
  leftBoard.innerHTML = "";
  rightBoard.innerHTML = "";

  // Create image elements and set their src attributes
  const leftImage = document.createElement("img");
  leftImage.src = imageSet.leftImageSrc;

  const rightImage = document.createElement("img");
  rightImage.src = imageSet.rightImageSrc;

  // Append images to respective boards
  leftBoard.appendChild(leftImage);
  rightBoard.appendChild(rightImage);
}

function resetGame() {
  // Load images for the current image set
  const currentImageSet = imageSets[currentImageSetIndex];
  mainImageSet(currentImageSet);

  // REMOVE ALL CLICKED AND CORRECT CLASSES FROM BOXES:
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.classList.remove("clicked", "correct");
  });

  //reset tickers to their default color:
  const tickers = document.querySelectorAll(".ticker-box");
  tickers.forEach((ticker) => {
    ticker.style.backgroundColor = "#d9d9d9";
  });

  //reset result display
  const resultDisplay = document.getElementById("result");
  resultDisplay.textContent = "Find 3 spots";

  // reset timer display and button
  const timerDisplay = document.getElementById("timer");
  const myButton = document.getElementById("myButton");
  timerDisplay.textContent = "";
  timerDisplay.style.color = "";
  myButton.textContent = "Start";
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
  const currentImageSet = imageSets[currentImageSetIndex];
  const correctBoxIds = currentImageSet.correctBoxIds;

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
  //reset the game before starting:
  resetGame();

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

  // Increment currentImageSetIndex to move to the next set of images
  currentImageSetIndex++;
  if (currentImageSetIndex >= imageSets.length) {
    currentImageSetIndex = 0; // Reset index if it exceeds the array length
  }
  // Call function to display images for the new image set
  const currentImageSet = imageSets[currentImageSetIndex];
  mainImageSet(currentImageSet); // Call function to display images
}

document.getElementById("myButton").addEventListener("click", timer);

document.getElementById("myButton").addEventListener("click", function () {
  this.textContent = "Next";
  //   this.removeEventListener("click", timer); //remove previous event listener
  //   this.addEventListener("click", function () {
  //     resetGame();
  //     timer(); //start a new game when "next" button is clicked
  //   });
});
