// Game Values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessInput = document.querySelector('#guess-input'),
  guessBtn = document.querySelector('#guess-btn'),
  message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
  if (e.target.classList.contains('play-again')) {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
    guessInput.value = '';
    return;
  }

  // Check for winner
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    // If they guessed wrong
    guessesLeft--;

    // Check if game is over
    if (guessesLeft === 0) {
      gameOver(
        false,
        `Game over, you lost. The correct number was ${winningNum}.`
      );
    } else {
      // another guess
      guessInput.style.border = 'solid red 1px';
      guessInput.value = '';
      setMessage(
        `${guess} is not correct, ${guessesLeft} guesses left...`,
        'black'
      );
    }
  }
});

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function gameOver(didWin, msg) {
  if (didWin) {
    // Disable input
    guessInput.disabled = true;
    // Inform user they won
    guessInput.style.border = 'solid green 2px';
    setMessage(msg, 'green');
  } else {
    // Disable input
    guessInput.disabled = true;
    guessInput.style.border = 'solid red 2px';
    // Clear input
    guessInput.value = '';
    // Inform user they won
    setMessage(msg, 'red');
  }

  // Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += ' play-again';
}

// Get random number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
