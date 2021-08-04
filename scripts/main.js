let instruction1 = document.getElementById("Instruction1");
let instruction2 = document.getElementById("Instruction2");
let gameFinish = 0;
let stepCounter = 0;
let playCharacter = "X";
let gameTable = [];

let buttonX = document.getElementById("buttonX");
buttonX.onclick = function () {setPlayCharacter(buttonX.textContent)};

let button0 = document.getElementById("button0");
button0.onclick = function () {setPlayCharacter(button0.textContent)};

let buttonStart = document.getElementById("buttonStart");
buttonStart.onclick = startGame;

let buttonRestart = document.getElementById("buttonRestart");
buttonRestart.onclick = restartGame;

function setPlayCharacter(character) {
	if (character !== "X") {
		playCharacter = "0";
	}
	instruction2.style.display = "block";
	document.getElementById("startGame").style.display = "block";
}

function startGame() {
	initializeGameTable();
	instruction1.textContent = "Is Player 1 turn";
	document.getElementById("buttonsX0").style.display = "none";
	instruction2.style.display = "none";
	document.getElementById("startGame").style.display = "none";
	document.getElementById("gameTable").style.display = "block";
	for (let i = 1; i <= 3; ++i) {
		for (let j = 1; j <= 3; ++j) {
			document.getElementById("" + i + j).onclick = function() {checkCharacter("" + i + j)};
		}
	}
}

function checkCharacter(id) {
	if (gameFinish === 0) {
		// Display the appropriate character (X or 0) in the clicked "div" container
		document.getElementById(id).textContent = playCharacter;
		// Disable all events of the just clicked "div" container
		document.getElementById(id).style.pointerEvents = "none";
		gameTable[id[0] - 1][id[1] - 1] = playCharacter;
		++stepCounter;
		if (stepCounter > 4) {
			// Check the main diagonal
			for (let i = 0, j = 0; i < 3; ++i, ++j) {
				if ((gameTable[i][j] == "") || (gameTable[i][j] != playCharacter)) {
					break;
				} else if (i === 2) {
					gameFinish = 1;
					displayWinner();
				}
			}
			// Check the secondary diagonal
			for (let i = 0, j = 2; i < 3 && gameFinish === 0; ++i, --j) {
				if (gameTable[i][j] == "" || gameTable[i][j] != playCharacter) {
					break;
				} else if (i === 2) {
					gameFinish = 1;
					displayWinner();
				}
			}
			// Check rows & columns
			for (let row = 0, column = 0; row < 3 && gameFinish === 0; ++row, ++column) {
				for (let i = 0; i < 3; ++i) {
					if (gameTable[i][column] == "" || gameTable[i][column] != playCharacter) {
						break;
					} else if (i === 2) {
						gameFinish = 1;
						displayWinner();
					}
				}
				for (let j = 0; j < 3 && gameFinish === 0; ++j) {
					if (gameTable[row][j] == "" || gameTable[row][j] != playCharacter) {
						break;
					} else if (j === 2) {
						gameFinish = 1;
						displayWinner();
					}
				}
			}
		}
		// The equality case
		if (stepCounter === 9 && gameFinish === 0) {
			instruction1.textContent = "Equality! No one won!"
			document.getElementById("restartGame").style.display = "block";
		}
		// Change the play character (mark) alternatively and diplay which player turn is
		if (gameFinish === 0 && stepCounter !== 9) {
			if (playCharacter === "X") {
				playCharacter = "0";
			} else {
				playCharacter = "X";
			}
			if (stepCounter % 2 != 0) {
				instruction1.textContent = "Is Player 2 turn";
			} else {
				instruction1.textContent = "Is Player 1 turn";
			}
		}		
	}
}

function displayWinner() {
	if (stepCounter % 2 != 0) {
		instruction1.textContent = "Player 1 you WON!!! Congratulations!!!"
		instruction2.textContent = "Player 2 you have lost... I'm sorry..."
		instruction2.style.display = "block";
	} else {
		instruction1.textContent = "Player 2 you WON!!! Congratulations!!!"
		instruction2.textContent = "Player 1 you have lost... I'm sorry..."
		instruction2.style.display = "block";
	}
	document.getElementById("restartGame").style.display = "block";
}

function restartGame() {
	gameFinish = 0;
	stepCounter = 0;
	playCharacter = "";
	initializeGameTable();
	location.reload();
}

function initializeGameTable() {
	for (let i = 0; i < 3; ++i) {
		gameTable[i] = [];
		for(let j = 0; j < 3; ++j) {
			gameTable[i][j] = "";
		}
	}
}