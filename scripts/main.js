let gameTable = [];
let playCharacter = "";
let instruction1 = document.getElementById("Instruction1");
let instruction2 = document.getElementById("Instruction2");

for (let i = 0; i < 3; ++i) {
	gameTable[i] = [];
	for(let j = 0; j < 3; ++j) {
		gameTable[i][j] = "";
	}
}

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
	instruction1.textContent = "Is Player 1 turn";
	document.getElementById("buttonsX0").style.display = "none";
	instruction2.style.display = "none";
	document.getElementById("startGame").style.display = "none";
	document.getElementById("gameTable").style.display = "block";
	for (let i = 1; i <= 3; ++i) {
		for (let j = 1; j <= 3; ++j) {
			document.getElementById("" + i + j).onclick = function() {displayCharOnTable("" + i + j)};
		}
	}
}

function displayCharOnTable(id) {
	document.getElementById(id).textContent = playCharacter;
	gameTable[id[0] - 1][id[1] - 1] = playCharacter;
	document.getElementById(id).style.pointerEvents = "none";
}