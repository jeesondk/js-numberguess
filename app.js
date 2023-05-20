// Game values
let min = 1, 
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn')
    guessInput = document.querySelector("#guess-input"),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Liten for play again
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    
    // Validatge
   if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
   }
   
   // Check if won
   if(guess === winningNum){
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
   } else {
    // Wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0) {
        // Game over - lost
        gameOver(false, `Game Over, you lost. the correct number was ${winningNum}`);
        } else {
            // Game continues - answer wrong
            continueGame(`${guess} is not correct, ${guessesLeft} guesses left`);

             
        }
    }
          
});

function gameOver(won, msg){
    let color;
    won ? color = 'green': 'red';
    
    guessInput.disabled =  true;
        // Change border color
        guessInput.style.borderColor = color;
        message.style.color = color;
        // Set message
        setMessage(msg, color);

        // Play again?
        guessBtn.value = 'Play Again?'
        guessBtn.className += 'play-again';
}

function continueGame(msg) {
    guessInput.style.borderColor = 'red';
    guessInput.value = '';
    setMessage(msg, 'red'); 
}

// Get winning number
function getRandomNum(min, max){
   return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}