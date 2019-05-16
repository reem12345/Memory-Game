/*
 * Create a list that holds all of your cards
 */

//restart the game when click "restart"
const repeat = document.querySelector('.restart');
repeat.addEventListener('click',restartGame);

//fetch and store all HTML cards
const ListOfCards = document.getElementsByClassName('card');

// convert HTMLcollection to an array
let arr = Array.prototype.slice.call( ListOfCards );

//call the game function
restartGame();

//the game function
function restartGame() {
    
    //initialize the needed variable
    let numOfMoves = 0;
    let moves = document.querySelector(".moves");
    moves.textContent = 0;
    let endGame = [];
    let stars = 3;
    const ListOfStars = document.getElementsByClassName('fa fa-star');
    ListOfStars[0].style.color = '#FFD700';
    ListOfStars[1].style.color = '#FFD700';
    ListOfStars[2].style.color = '#FFD700';
    let seconds = 0;
    let timer = null;
    let save_time = '0';
    let openList = [];
    let clickedList = [];
    let body = document.querySelector('.container');
    if( document.querySelector('.message') != null) {

        body.removeChild(document.querySelector('.message'));
    }



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

    shuffle(arr);

    const deck = document.querySelector(".deck");
    for (let i=0; i < arr.length; i++) {

        let classi = arr[i].firstElementChild.className;
        arr[i].remove();
        let cardli = document.createElement("li");
        cardli.setAttribute("class","card");
        cardli.setAttribute("data-id",i);
        let cardi = document.createElement("i");
        cardi.setAttribute("class",`${classi}`);
        cardli.appendChild(cardi);
        deck.appendChild(cardli);
        arr[i]= cardli;
   
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

    //set timer 
    function Start_Time() {
        timer = setInterval(countTime,1000);
    }
    
    // stop the timer when click "restart"
    const repeat = document.querySelector('.restart');
    repeat.addEventListener('click',Stop_Time);

    // stop the timer
    function Stop_Time() {
        clearInterval(timer);
        const time = document.querySelector(".timer");
        save_time = time.textContent;
        time.textContent = `0:0`;
    }

    // diplay the cards when clicked
    MemeoryGame();

    // implement the game actions 
    function OpenCard() {

        //open the card clicked 
        this.setAttribute("class", "card open show");
        openList.push(this);
        clickedList.push(this);
        
        //start timer
        if(clickedList.length == 1) {
            Start_Time();
        }

        //compare the two clicked cards
        if(openList.length >= 2) {

            if ( this.firstElementChild.className == openList[openList.length-2].firstElementChild.className 
                && this.getAttribute("data-id") != openList[openList.length-2].getAttribute("data-id") ) {
                    this.setAttribute("class", "card match");
                    openList[openList.length-2].setAttribute("class", "card match");
                    this.removeEventListener('click',OpenCard);
                    openList[openList.length-2].removeEventListener('click',OpenCard);
                    openList = [];
                    endGame.push(this);
                    endGame.push(openList[openList.length-2]);
                    numOfMoves++;
                    moves.textContent = numOfMoves;
                    
                    //display Congratulations Popup when all cards match
                    if(endGame.length == 16) {
                        Stop_Time();
                        let message = document.createElement("div");
                        message.setAttribute("class","message");
                        message.style.cssText = 'width: 390px; height: 120px; background: white; border-radius: 4px; box-shadow: 12px 10px 12px 10px rgba(46, 61, 73, 0.5); ';
                        let text = document.createElement("span");
                        text.textContent = `Congratulations!!! you are complete the game during ${save_time} with ${numOfMoves} move(s) and ${stars} star(s). Do you want to play again?`;
                        let button = document.createElement("div");
                        button.setAttribute("class","button");
                        button.style.cssText = 'width: 80px; height: 35px; background: black; margin-left: 150px; margin-top: 10px; ';
                        let text1 = document.createElement("span");
                        text1.textContent = 'yes';
                        text1.style.cssText = 'color: white';
                        button.appendChild(text1);
                        message.appendChild(text);
                        message.appendChild(button);
                        document.querySelector('.score-panel').insertAdjacentElement('afterend',message);
                        button.addEventListener('click',restartGame);
                    }
            }
            else if ( this.firstElementChild.className != openList[openList.length-2].firstElementChild.className ) {

                this.setAttribute("class", "card notmatch");
                openList[openList.length-2].setAttribute("class", "card notmatch");
                setTimeout(remove,700,this,openList[openList.length-2]);
                openList = [];
                numOfMoves++;
                moves.textContent = numOfMoves;
            }

   
        // descrease the star rating
        if ( numOfMoves % 10 == 0 && numOfMoves!= 0 ) {
            stars--;
            if( stars == 2 ) {
                ListOfStars[2].style.color = 'white';
            }
            else if (stars == 1 ) {
                ListOfStars[1].style.color = 'white';
            }
            else if( stars < 1 ) {
                ListOfStars[0].style.color = 'white';
            }
        }

        } 
    }

    //lock the cards
    function remove(card1,card2) {
        card1.setAttribute("class", "card");
        card2.setAttribute("class", "card");
    }

    //compute timer
    function countTime() {
        ++seconds;
        const hour = Math.floor(seconds /3600) *1;
        const minute = Math.floor((seconds - hour*3600)/60) *1;
        const second = seconds - (hour*3600 + minute*60);
        const time = document.querySelector(".timer");
        time.textContent = `${minute}:${second}`;
    }

    function MemeoryGame(){
        //display the cards
        for (let i=0; i < arr.length; i++){
            arr[i].addEventListener('click',OpenCard);
        }
    }
}
