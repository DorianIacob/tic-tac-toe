let instruction1 = document.getElementById("Instruction1");
let instruction2 = document.getElementById("Instruction2");
let gameFinish = 0;
let stepCounter = 0;
let playCharacter = "";
let gameTable = [];

let buttonX = document.getElementById("buttonX");
buttonX.onclick = function () {setPlayCharacter(buttonX.textContent)};

let button0 = document.getElementById("button0");
button0.onclick = function () {setPlayCharacter(button0.textContent)};

function setPlayCharacter(character) {
	if (character === "X") {
		playCharacter = "X";
	} else {
		playCharacter = "0";
	}
	instruction2.style.display = "block";
	document.getElementById("startGame").style.display = "block";
}

let buttonStart = document.getElementById("buttonStart");
buttonStart.onclick = startGame;

function startGame() {
	initializeGameTable();
	instruction1.textContent = "Is Player 1 turn";
	document.getElementById("buttonsX0").style.display = "none";
	instruction2.style.display = "none";
	document.getElementById("startGame").style.display = "none";
	document.getElementById("gameTable").style.display = "block";
	for (let i = 1; i <= 3; ++i) {
		for (let j = 1; j <= 3; ++j) {
			document.getElementById("" + i + j).onclick = function() {mainGame("" + i + j)};
		}
	}
}

function initializeGameTable() {
	for (let i = 0; i < 3; ++i) {
		gameTable[i] = [];
		for(let j = 0; j < 3; ++j) {
			gameTable[i][j] = "";
		}
	}
}

function mainGame(id) {
	if (gameFinish === 0) {
		document.getElementById(id).textContent = playCharacter;
		gameTable[id[0] - 1][id[1] - 1] = playCharacter;
		document.getElementById(id).style.pointerEvents = "none";
		++stepCounter;
		if (stepCounter > 4) {
//Check the main diagonal
			for (let i = 0, j = 0; i < 3; ++i, ++j) {
				if ((gameTable[i][j] == "") || (gameTable[i][j] != playCharacter)) {
					break;
				} else if (i === 2) {
					gameFinish = 1;
					displayWinner();
					break;
				}
			}
//Check the secondary diagonal
			for (let i = 0, j = 2; i < 3; ++i, --j) {
				if (gameTable[i][j] == "" || gameTable[i][j] != playCharacter) {
					break;
				} else if (i === 2) {
					gameFinish = 1;
					displayWinner();
					break;
				}
			}
//Check rows & columns
			for (let row = 0, column = 0; row < 3 && gameFinish === 0; ++row, ++column) {
				for (let i = 0; i < 3; ++i) {
					if (gameTable[i][column] == "" || gameTable[i][column] != playCharacter) {
						break;
					} else if (i === 2) {
						gameFinish = 1;
						displayWinner();
						break;
					}
				}
				for (let j = 0; j < 3; ++j) {
					if (gameTable[row][j] == "" || gameTable[row][j] != playCharacter) {
						break;
					} else if (j === 2) {
						gameFinish = 1;
						displayWinner();
						break;
					}
				}
			}
		}
		if (stepCounter === 9 && gameFinish === 0) {
			instruction1.textContent = "Equality! No one won!"
			document.getElementById("restartGame").style.display = "block";
		}
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
		instruction2.textContent = "Player 2 you have lost... Sorry..."
		instruction2.style.display = "block";
	} else {
		instruction1.textContent = "Player 2 you WON!!! Congratulations!!!"
		instruction2.textContent = "Player 1 you have lost... Sorry..."
		instruction2.style.display = "block";
	}
	document.getElementById("restartGame").style.display = "block";
}

let buttonRestart = document.getElementById("buttonRestart");
buttonRestart.onclick = restartGame;

function restartGame() {
	gameFinish = 0;
	stepCounter = 0;
	playCharacter = "";
	initializeGameTable();
	location.reload();
}