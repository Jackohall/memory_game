/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb',
];


function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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



let stars = document.querySelectorAll('.star');

let matches = 0;

let finishedAt = 0;

let openCards = [];

let moves = 25;

let stars_win = document.querySelectorAll('.star-win');

const moveCounter = document.querySelectorAll('.moves')[0];

function initGame() {
    const deck = document.querySelectorAll('.deck')[0];

    restart()


    const cardHTML = shuffle(cards).map(function (card) {
        return generateCard(card);
    });
    moves = 25;
    moveCounter.innerText = moves;

    deck.innerHTML = cardHTML.join('');


    const allcards = document.querySelectorAll('.card');





    // if the cards match


    allcards.forEach(function (card) {
        card.addEventListener('click', function (e) {
            console.log('clicked')

            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                openCards.push(card);
                card.classList.add('open', 'show');

                if (openCards.length == 2) {
                    if (openCards[0].dataset.card == openCards[1].dataset.card) {
                        openCards[0].classList.add('match');
                        openCards[0].classList.add('open');
                        openCards[0].classList.add('show');

                        openCards[1].classList.add('match');
                        openCards[1].classList.add('open');
                        openCards[1].classList.add('show');

                        openCards = [];
                    } else {
                        //if no match,hide
                        openCards[1].classList.add('wrong');
                        openCards[0].classList.add('wrong');
                        setTimeout(function () {
                            openCards.forEach(function (card) {
                                card.classList.remove('open', 'show', 'wrong');
                            });

                            openCards = [];
                        }, 450);
                    }

                    // moves and stars

                    moves -= 1;
                    moveCounter.innerText = moves;

                    if (moves == 10) {
                        stars[0].classList.add('remove_star');
                    }
                    if (moves == 5) {
                        stars[1].classList.add('remove_star');
                    }

                    // stars win

                    if (moves == 10) {
                        stars_win[0].classList.add('remove_star');
                        console.log('remove');
                    }
                    if (moves == 5) {
                        stars_win[1].classList.add('remove_star');
                    }

                    // overlay

                    if (moves == 0) {
                        document.getElementById("overlay").style.display = "block";
                    }
                }
            }

            if (card.classList.contains('match')) {
                matches++
                console.log(matches);
            }

            // set matches 

            if (matches == 8) {

                finishedAt = pad(parseInt(totalSeconds / 60)) + ":" + pad(totalSeconds % 60);
                console.log(finishedAt)
                document.querySelector("#finTimer").innerHTML = finishedAt;


                document.getElementById("overlay_block").style.display = "block";
                console.log('end');

                document.getElementById("overlay_win").style.display = "block";
                console.log('end');
            }

        });
    });
}

// Timer Function


let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
let timerInt = 0;

function startTimer() {
    if (timerInt == 0) {
        timerInt = setInterval(setTime, 1000);
    }
}



function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    const valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}



function restart() {
    console.log("restart")
    minutesLabel.innerHTML = "00";
    secondsLabel.innerHTML = "00";
    totalSeconds = 0;

    matches = 0;
    moves = 25;
    moveCounter.innerText = moves;
    openCards.innerHTML = [];
    document.getElementById("overlay_block").style.display = "";
    document.getElementById("overlay_win").style.display = "";
    stars[0].classList.remove('remove_star');
    stars[1].classList.remove('remove_star');
    stars_win[0].classList.remove('remove_star');
    stars_win[1].classList.remove('remove_star');
    clearInterval(timerInt)
    timerInt = 0;
}


initGame();

