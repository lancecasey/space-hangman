//get variables ready
let words = [
	"black hole",
	"galaxy",
	"milky way",
	"jupiter",
	"hubble telescope",
	"acidalia planitia",
	"mars reconnaissance orbiter"
];
let word; //word that is randomly chosen for the game
let guessedLetters = []; //array to store already guessed letters in
let guessingWord = []; //array to store the word(string) broken up into an array of letters
let remainingGuesses; //counter that will decrement with each guess and be used to determine if the player has lost
let hasFinished = false; //boolean to keep track of whether the game is active or not
let wins = 0; //variable to store the players number of wins
const rC = document.getElementById("rocketContainer");
const a = document.getElementById("alerts");

//function to return game to defaults
function resetGame() {
	word = words[Math.floor(Math.random() * words.length)]; //randomly select new word

	//reset remaining guesses
	if (word.length > 10) {
		remainingGuesses = 10;
	} else {
		remainingGuesses = word.length;
	}

	rC.className = "rocketCon"; //reset rocket
	a.innerText = "use your keyboard to guess the letters that make up this INTERGALACTIC word!"; //reset instructions

	//reset arrays
	guessedLetters = [];
	guessingWord = [];

	for (let i = 0; i < word.length; i++) {
		if (word.charAt(i) === " ") {
			guessingWord[i] = " ";
		} else guessingWord[i] = "_";
	}
	//now that variables are reset refresh the screen
	updateDisplay();
}

//function to update display
function updateDisplay() {
	document.getElementById("wins").innerText = wins;
	//use .join to convert letter array into string separated by spaces
	document.getElementById("word").innerText = guessingWord.join(" ");
	document.getElementById("remainingGuesses").innerText = remainingGuesses;
	document.getElementById("guessedLetters").innerText = guessedLetters.join(" ");
}

function evaluateGuess(letter) {
	let letterArray = []; //array to store positions of letters in word
	for (let i = 0; i < word.length; i++) {
		//loop through word to find instances of letter
		if (word.charAt(i) === letter) {
			//if character at current index equals the guessed letter, then
			letterArray.push(i); //push the index on to letterArray
		}
	}
	//if letter not in word, decrement remainingGuesses and update imagery
	if (letterArray.length <= 0) {
		//if no positions were pushed into letter array, then letter must not have been in word, so
		remainingGuesses--; //decrement the remainingGuesses variable
	} else {
		//else update guessingWord with letters based on indexes saved in letterArray
		for (let i = 0; i < letterArray.length; i++) {
			//loop through letterArray
			guessingWord[letterArray[i]] = letter; //assign letter to guessingWord based on letterArray indexes
		}
	}
}

function checkWin() {
	if (guessingWord.indexOf("_") === -1) {
		wins++;
		hasFinished = true;
		a.innerText = "You won! Press any key to play again.";
		rC.className += " animated bounceOutRight";
	}
}

function checkLoss() {
	if (remainingGuesses <= 0) { //TODO update this to blow the rocket too...
		a.innerText = "You lost! Press any key to play again."; 
		hasFinished = true;
	}
}

function makeGuess(letter) {
	//function to make sure that guesses remain and letter has not already been guessed
	if (remainingGuesses >= 0) {
		if (guessedLetters.indexOf(letter) === -1) {
			guessedLetters.push(letter);
			evaluateGuess(letter);
		}
	}
}

document.onkeydown = ("DOMContentLoaded",
function(ev) {
	if (hasFinished) {
		//if hasFinished === true, reset game, reset hasFinished flag
		resetGame();
		hasFinished = false;
	} else {
		if (ev.keyCode >= 65 && ev.keyCode <= 90) {
			let letter = ev.key;
			a.innerText = "use your keyboard to guess the letters that make up this INTERGALACTIC word!";
			makeGuess(ev.key);
			updateDisplay();
			checkWin();
			checkLoss();
		} else {
			a.innerText = "Invalid guess - try again using only lowercase letters!";
		}
	}
});
