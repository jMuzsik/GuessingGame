function generateWinningNumber(){
	return 1+Math.floor(Math.random()*100);
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function Game(){
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
	return Math.abs(this.winningNumber-this.playersGuess);
}

Game.prototype.isLower = function(){
	return this.playersGuess < this.winningNumber ? true : false;
}

Game.prototype.playersGuessSubmission = function(x){
	if(typeof x !== 'number'||x>100||x<1) throw('That is an invalid guess.');
	if(this.pastGuesses.length !== 4) {
		return this.checkGuess(x);
	}
	else {
	  if(this.checkGuess(x)==='You Win!') return 'You Win!';
	  else return 'You Lose.';
	}
}

Game.prototype.checkGuess = function(y){
  if(y===this.winningNumber) return 'You Win!';
	this.playersGuess = y;
	this.pastGuesses.push(y);
	var len = this.pastGuesses.length;
	for(let i = 0; i < len-1; i++){
		if(y === this.pastGuesses[i]) {
		  return 'You have already guessed that number.';
		}
	}
	if(this.difference()<10) return "You're burning up!";
	if(this.difference()<25) return "You're lukewarm.";
	if(this.difference()<50) return "You're a bit chilly.";
	if(this.difference()<100) return "You're ice cold!";
}

Game.prototype.provideHint = function(){
	return shuffle([this.winningNumber,generateWinningNumber(),generateWinningNumber()]);
}

function newGame (){
	return new Game();
}