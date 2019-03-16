/**
 * JS code for Memory Game:
 */
//all variables:
var deck = document.querySelector('.deck');
var listOfCards = deck.querySelectorAll('li.card');
var score = document.querySelector('.score-panel');
var message = document.querySelector('.msg');
var message2 = document.querySelector('.msg2');
var matched = document.getElementsByClassName('match');
var stars = document.querySelector('.stars');
var starOne = document.querySelector('.one.fa-star');
var starTwo = document.querySelector('.two.fa-star');
var starThree = document.querySelector('.three.fa-star');
var setTime = document.querySelector('.time');
var moves = document.querySelector('.moves');
var resetBtn = document.querySelector('.restart');
var opened = [];
var count = 0;

//functions:
/**
 * @description sets the cards anew shuffled and sets time and counter.
 * @param {array} cardsArray.
 * @param {nodeList} listOfCards.
 * @returns {array} an array filled with the items for the nodeList.
 */
//1.startgame function
function startGame() {
    window.addEventListener('load', function() {
        counter(deck);
        timer();
        rating();
        var cardsArray = []; //define an array to put nodeList in it.

        for (i = 0; n = listOfCards[i]; ++i) {
            cardsArray.push(n); //fill every index of our nodeList into this defined Array.
        }

        shuffle(cardsArray); //now you can apply the shuffle to the array.

        for (i = 0; i < cardsArray.length; i++) {
            deck.appendChild(cardsArray[i]); //attach to end of deck element.
        }
    });
}

//2.function to close card if not matched after a short time.
/**
 * @description close opened card a time is out
 * @param {number} t is delay time
 * @returns {array} opened is set to original and close cards after time delay
 */
function timeOut(t) {
    setTimeout(function() {
        opened.forEach(
            function(card) {
                card.classList.remove('open', 'show');
            }
        );
        opened = [];
    }, t);

}

//3.reset button
/**
 * @description Adds event to button to restart game
 * @param {object} resetBtn
 * @returns {} new game and set of cards.
 */
resetBtn.addEventListener('click', function(evt) {
    window.location.href = window.location.pathname + window.location.search + window.location.hash;
});

//4.timer
/**
 * @description calculates time from start of game until finish.
 * @param {number} sec
 * @param {number} min
 *@param {number} hour
 * @returns {number} timer counting with seconds, minutes, hour.
 */
var sec = 0;
var min = 0;
var hour = 0;
var time;

function timer() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
            hour++;
        }
    }
    time = setTimeout(timer, 1000);
    setTime.innerHTML = hour + ':' + min + ':' + sec;
}

//5.congrats popup
/**
 * @description pops a final score message.
 * @param {string} score
 * @param {string} rating
 * @param {string} message
 * @param {number} time
 * @param {number} moves
 * @returns {}  a congratulations message.
 */
function congrats() {
    score.classList.add('result');
    message.classList.remove('hide');
    message2.classList.remove('hide');
    deck.classList.add('overlay');
    rating();
    clearTimeout(time);
}
//6. stars rating function
/**
 * @description determine starrating from number of moves(count)
 * @param {string} stars
 * @param {number} count
 * @returns {string} star rating f player
 */
function rating() {
    if (count <= 20) {
        stars.style.color = 'gold';
    } else if (count <= 28) {
        starOne.style.color = 'gold';
        starTwo.style.color = 'gold';
        starThree.style.color = '#2e3d49';
        message2.textContent = 'GOOD SCORE but you can do better. 😊 ';
    } else if (count > 28 && count <= 40) {
        starOne.style.color = 'gold';
        starTwo.style.color = '#2e3d49';
        starThree.style.color = '#2e3d49';
        message2.textContent = 'So So  😐';
    } else {
        starOne.style.color = '#2e3d49';
        message2.textContent = 'not so good...☹️';
    }
}

// 7.Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//8. move counter function
/**
 * @description counts moves/clicks of player(event)
 * @param {number} count
 * @returns {number} number of moves(clicks)
 */
function counter() {
    document.addEventListener('click', function(event) {
        moves.innerHTML = ' ↪ ' + count + ' moves';
        rating();
    });
}

startGame();

//loop through each card and atatch a click event
listOfCards.forEach(function(card) {
    card.classList.add('open', 'show'); //show all cards at start of game
    //hide cards after 3 seconds
    setInterval(
        function initial() {
            card.classList.remove('open', 'show');
        }, 3000);

    card.addEventListener('click', function(e) {
        if (!card.classList.contains('open', 'show')) {
            opened.push(card); //contain cards in array called opened for opened cards.
            card.classList.add('open', 'show'); //open and show card icon upon click event.

            if (opened.length == 2 && matched.length < 16) {
                //if cards are a match=> add class match+stay opened
                if (opened[0].dataset.card == opened[1].dataset.card) {
                    opened[0].classList.add('match', 'open', 'show');
                    opened[1].classList.add('match', 'open', 'show');
                    opened = [];
                } else {
                    timeOut(1000); //hide cards if not matched after opening two cards
                }
            }
            count++;
        }
        if (matched.length == 16) {
            congrats();
        }
    });
});
