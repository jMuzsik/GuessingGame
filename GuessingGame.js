


/*all the javascript things*/



function generateWinningNumber(){
	return 1+Math.floor(Math.random()*100);
}

function shuffle(array) {
  var m = array.length, t, i;

  while (m) {

    i = Math.floor(Math.random() * m--);

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
	console.log(this.pastGuesses)
	if(this.pastGuesses === null) {
		return this.checkGuess(x);
	}
	if(this.pastGuesses.length !== 4){
		return this.checkGuess(x);
	}
	else {
	  if(this.checkGuess(x)==='You Win Nothing!') return 'You Win Nothing!';
	  else return 'You Lose.';
	}
}

Game.prototype.checkGuess = function(y){
  if(y===this.winningNumber) return 'You Win Nothing!';
	this.playersGuess = y;
	this.pastGuesses.push(y);
	var len = this.pastGuesses.length;
	for(let i = 0; i < len-1; i++){
		if(y === this.pastGuesses[i]) {
		  return 'You guess before, why you do again? I no get.';
		}
	}									
	if(this.difference()<2) return   "Ogly,Ogly,Og!";
	if(this.difference()<5) return   "FIRE!!!!!!!!";
	if(this.difference()<9) return  "YOU SO CLOSE";
	if(this.difference()<16) return  "A wee bit far.";
	if(this.difference()<25) return  "Oh nonono FAR";
	if(this.difference()<35) return "REAL CRAZY FAR";
	if(this.difference()<100) return "UHHH UHHHHHHH";

}

Game.prototype.provideHint = function(){
	return shuffle([this.winningNumber,generateWinningNumber(),generateWinningNumber()]);
}

function newGame (){
	return new Game();
}


//jQuery functionality

$(document).ready(function() { 
	var newGame = new Game(),
	check = '',
	x = $('input#number');

	//pop up every time user clicks on the input box.
	//there is h1 on top of image that changes based upon returned
	//value of player submission

	function owl (check){
		$('div.hidden-body').show();
		$('h1.hidden-text-1').text(check);
   		setTimeout(function() { 
       		$('div.hidden-body').fadeOut(); 
   		}, 2000);
	}

	//every visible change on page as well as the changes done
	//to the newGame object.

	function setValue (){

		//saving the returned string to use later.

		check = newGame.playersGuessSubmission(parseInt(x.val(),10));

		//generating one of the hints, 15 random numbers.
		//right after, the winning number is placed randomly in one of the indexes

		var i=0,arr=[];
		while(i<15){
			arr.push(generateWinningNumber());
			i++;
		}
		arr[Math.floor(Math.random()*15)] = newGame.winningNumber;

		//different image is displayed if user wins. Pointing animal.

		if(check === 'You Win Nothing!') {
			$('div.hidden-body').css({'background': 'url("images/pointing.jpg")','background-size':'1300px'});
		}

		//each instance of game, 3 values change. 
			//hippo stores previous values and says derogatory things.
			//bird thing on left has answer within array of 10, values keep changing,
				//except that the value is within it constantly, in diffent idx each time.
			//right bird thing reminds you what the owl said.

		var len = newGame.pastGuesses.length;
		if(len-1===0) {
			$('.hippo-talk').html(newGame.pastGuesses.join(' ')+"? you ain't got it in ya");
			$('button.btn.btn-primary.btn-md.left').html(arr.join(' ') + ': One this');
			$('button.btn.btn-primary.btn-md.right').html('Owl say: '+check);
		}
		else if(len-1===1) {
			$('.hippo-talk').html(newGame.pastGuesses.join()+"??? Ha! crap shoot.");
			$('button.btn.btn-primary.btn-md.right').html('Owl say: '+check);
			$('button.btn.btn-primary.btn-md.left').html(arr.join(' ') + ': One this');
		}
		else if(len-1===2) {
			$('.hippo-talk').html(newGame.pastGuesses.join()+'  grubgrubgrub');
			$('button.btn.btn-primary.btn-md.right').html('Owl say: '+check);
			$('button.btn.btn-primary.btn-md.left').html(arr.join(' ') + ': One this');
		}
		else if(len-1===3) {
			$('.hippo-talk').html(newGame.pastGuesses.join()+'  One More!!!');
			$('button.btn.btn-primary.btn-md.right').html('Owl say: '+check);
			$('button.btn.btn-primary.btn-md.left').html(arr.join(' ') + ': One this');
		}
		else if(len-1===4) {
			$('.hippo-talk').html(newGame.pastGuesses.join()+'  suckaa');
			$('button.btn.btn-primary.btn-md.right').html('You diarhea, real mushy kind');
			$('button.btn.btn-primary.btn-md.left').html('I help, you fail, you no friend');
		} 
		//same as resetting the game, user clicks 6 times does it.
		else{
			newGame = new Game();
			$('.hippo-talk').html('I got something to say');
			$('button.btn.btn-primary.btn-md.right').html('Me too, thing I tell');
			$('button.btn.btn-primary.btn-md.left').html('I tell you thing');
		}

		//return value to 0

		x.val() = 0;
	}

	//I tried to do both on a mouseclick but did not work, after struggling this worked,
	//two separate. Mousedown,mouseup are irrelevant, well suppose it wouldn't work if
	//user changed mind while holding down mouse. But too late.

	$('button.btn.btn-success').on('mousedown', function() {
		setValue();
	});
	$('button.btn.btn-success').on('mouseup', function() {
		owl(check);
	});

	//Reset button brings everything back to how it was at the beginning

	$('input.btn.btn-danger').on('click', function(){
		newGame = new Game();
		$('.hippo-talk').html('I got something to say');
		$('button.btn.btn-primary.btn-md.right').html('Me too, thing I tell');
		$('button.btn.btn-primary.btn-md.left').html('I tell you thing');
	})

	//Enter can also be used but the functionality does not work the same way at all.
	//Change this later? Likely not. So click, not enter!

	x.keypress(function(e) {
        if(e.which == 13) {
        	check = newGame.playersGuessSubmission(parseInt(x.val(),10));
	    	x.val() = 0;
        } 
	});
});