/*
 * Create a list that holds all of your cards
 */
//declare variables
const cardList = ["fa fa-diamond", "fa fa-paper-plane-o" , "fa fa-anchor" , "fa fa-bolt" , "fa fa-cube" ,"fa fa-leaf","fa fa-bicycle","fa fa-bomb" ];
let count = 0;
let tryes = 3;
let moves = 0;
let opencard = [];
const cards = document.getElementsByClassName("card");
const main = document.querySelector(".deck");
const container = document.querySelector(".container");
const star = document.getElementsByClassName("fa-star");
const secound = document.querySelector(".secound");
const minuet = document.querySelector(".minuet");
const rest = document.querySelector(".restart");
const num = document.querySelector("span");
const model = document.querySelector(".model");
const play = document.querySelector(".play");
const stxt = document.querySelector(".smalltxt");
let arr = Array.prototype.slice.call(cards);
var totalSeconds = 0;
//set interval for time of play
setInterval(setTime, 1000);
// for shhuffle the cards and add them to the DOM
arr = shuffle(arr);
let txt="";
for (var i = 0; i < arr.length ; i++) {
	txt = txt + arr[i].outerHTML + "\n";
}
main.innerHTML = txt ; 
// add event reset for reset the game 
rest.addEventListener('click',startgame);
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 // fn for start game
function startgame () {
	location.reload();
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
// timer fn for calculate time of finishing game
function setTime() {
  ++totalSeconds;
  secound.innerHTML = pad(totalSeconds % 60);
  minuet.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// fn for opening the card
function open (crd) {
	opencard[count] = crd;
	count +=1;
	crd.className= "card show open";
	if (count == 2){
		moves +=1;
		num.textContent= moves;
		check();
	} 
}
// check fn for 2 open cards
function check () {
	if (opencard[0].firstElementChild.className == opencard[1].firstElementChild.className){
		opencard[0].className="card match";
		opencard[1].className="card match";
		if (document.querySelectorAll(".card").length == document.querySelectorAll(".match").length){
			setTimeout(win,500);
		}
		opencard = [];
		count =0;
	}else {
		setTimeout(mismatch,500)
	}
}
// fn for return card and hidden the symbole again
function close () {
	opencard[0].className="card";
	opencard[1].className="card";
	opencard = [];
}
// fn for mismatch 2 open cards
function mismatch () {
		opencard[0].className= "card show open mismatch";
		opencard[1].className= "card show open mismatch";
		count = 3;
		setTimeout(close,500);
		count =0;
		tryes -=1;
		star[tryes].className += "-o";
		
		if (tryes == 0 ){
			setTimeout(end,500)
		}
}
// fn for lose the game and reset it 
function end (){
	model.style.display='block';
	alert("you used 3 try please start from begin")
	startgame();
}
// fn for win the game and play again 
function win (){
	container.style.display="none";
	model.style.display="block";
	stxt.innerHTML = "with "+ moves + " moves and " + tryes + " stars <p>WOOOOOOOOO!</p> "
	// alert("congratulation");
}
// add event for click ad any card to open it 
main.addEventListener('click',function(event){
	if (event.target.className == "card" && count < 2 && opencard.length  < 2) {
		open(event.target);
	}
});
main.addEventListener('dblclick',function(event){
	container.style.display="none";
	model.style.display="block";
	stxt.innerHTML = "with "+ moves + " moves and " + tryes + " stars <p>WOOOOOOOOO!</p> "
});
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

