/*
GAME RULES:
- This is a variation of Big Pig which, in turn, is a variation of Two-Dice Pig
- The game has 2 players, playing in rounds
- In each turn, a player rolls two dice as many times as he wishes.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- If the two dice both score 1, 25 is added to player's ROUND score and player cannot 'Hold'.
- BUT, if the player rolls a 1 on any one of the two dice, all his ROUND score gets lost. After that, it's the next player's turn
- If the two dice score a double other than 1, then twice the sum of the scores on the two dice is added to the player's ROUND score and player cannot 'Hold'
- If the two dice have different scores, then the sum of scores is added to player's ROUND score and player can 'Hold'
- The first player to reach 150 points on GLOBAL score wins the game
*/

var scores, roundScore, currentPlayer, gamePlaying, canHold;

scores = [0,0];
roundScore = 0;
currentPlayer = 0;
canHold = true;

// document.querySelector('#current-' + currentPlayer).textContent = dice;
// document.querySelector('#current-' + currentPlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent;
// console.log(x);

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
	if (gamePlaying) {
			// 1. Random number
	var dice1 = Math.floor(Math.random() * 6) + 1;
	var dice2 = Math.floor(Math.random() * 6) + 1;

	// 2. Display the result
	// var diceDOM = document.querySelector('.dice');
	document.getElementById('dice-1').style.display = 'block';
	document.getElementById('dice-2').style.display = 'block';
	document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
	document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

	if (dice1 !== 1 && dice2 !== 1 && dice1 !== dice2) {
		// Add to score
    var total = dice1 + dice2;
		roundScore += total;
		document.getElementById('current-' + currentPlayer).textContent = roundScore;
    canHold = true;
	} else if (dice1 === 1 && dice2 === 1){
    roundScore += 25;
    document.getElementById('current-' + currentPlayer).textContent = roundScore;
    canHold = false;
	} else if (dice1 === 1 || dice2 === 1) {
    nextPlayer();
    canHold = true;
  } else if (dice1 === dice2) {
    var specialSum = 2 * (dice1 + dice2);
    roundScore += specialSum;
    document.getElementById('current-' + currentPlayer).textContent = roundScore;
    canHold = false;
  }
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying && canHold) {
	// Add current score to player global score
	scores[currentPlayer] += roundScore;
	// Update the user interface
	document.getElementById('score-' + currentPlayer).textContent = scores[currentPlayer];

	var input = document.querySelector('.final-score').value;
	// Undefined, 0, null or "" are coerced to false;
	var winningScore;
	if (input) {
		winningScore = input;
	} else {
		winningScore = 150;
	}

	// Check if player won game
	if (scores[currentPlayer] >= winningScore) {
		gamePlaying = false;
		document.getElementById('name-' + currentPlayer).textContent = 'Winner!';
		document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
		document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
		document.getElementById('dice-1').style.display = 'none';
		document.getElementById('dice-2').style.display = 'none';
	} else {
	// Next Player
	nextPlayer();
	}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	gamePlaying = true;
	scores = [0, 0];
	currentPlayer = 0;
	roundScore = 0;
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer () {
	document.getElementById('current-' + currentPlayer).textContent = '0';
	document.querySelector('.player-'+ currentPlayer +'-panel').classList.remove('active');
	currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
	document.querySelector('.player-'+ currentPlayer +'-panel').classList.add('active');
	roundScore = 0;
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
}
