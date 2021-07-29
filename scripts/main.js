let gameTable = [];
let player1 = "";
let player2 = "";
let instruction1 = document.getElementById("Instruction1");
let instruction2 = document.getElementById("Instruction2");

for(let i = 0; i < 3; ++i) {
	gameTable[i] = [];
	for(let j = 0; j < 3; ++j) {
		gameTable[i][j] = "";
	}
}

let buttonX = document.getElementById("buttonX");
buttonX.onclick = function () {setPlayersCharacters(buttonX.textContent)};

let button0 = document.getElementById("button0");
button0.onclick = function () {setPlayersCharacters(button0.textContent)};

function setPlayersCharacters(character) {
	if (character === "X") {
		player1 = "X";
		player2 = "0"
	} else {
		player1 = "0";
		player2 = "X";
	}
}