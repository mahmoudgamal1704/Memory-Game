/*
 * Create a list that holds all of your cards
 */
const cardList = ["fa fa-diamond", "fa fa-paper-plane-o" , "fa fa-anchor" , "fa fa-bolt" , "fa fa-cube" ,"fa fa-leaf","fa fa-bicycle","fa fa-bomb" ];
let count = 0;
let moves = 3;
let opencard = [];
const cards = document.getElementsByClassName("card");
const main = document.querySelector(".deck");
let arr = Array.prototype.slice.call(cards);
arr = shuffle(arr);
let txt="";
for (var i = 0; i < arr.length ; i++) {
	txt = txt + arr[i].outerHTML + "\n";
}
main.innerHTML = txt ; 

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function startgame () {
	opencard = [];
	count =0;
	moves = 3;
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
function open (crd) {
	opencard[count] = crd;
	count +=1;
	crd.className= "card show open";
	if (count == 2){
		check();
	} 
};
function check () {
	if (opencard[0].firstElementChild.className == opencard[1].firstElementChild.className){
		opencard[0].className="card match";
		opencard[1].className="card match";
		startgame();
	}else {
		setTimeout(dismatch,500)
	}
};
function dismatch () {
		// opencard[0].style.backgroundColor='red';
		// opencard[1].style.backgroundColor='red';
		opencard[0].className="card";
		opencard[1].className="card";
		count =0;
};
main.addEventListener('click',function(event){
	if (event.target.className == "card" && count < 2) {
		open(event.target);
	}
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

