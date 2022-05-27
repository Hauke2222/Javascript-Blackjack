const cardSuit = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
const cardRank = [
    { 'rank': '2', 'value': 2 },
    { 'rank': '3', 'value': 3 },
    { 'rank': '4', 'value': 4 },
    { 'rank': '5', 'value': 5 },
    { 'rank': '6', 'value': 6 },
    { 'rank': '7', 'value': 7 },
    { 'rank': '8', 'value': 8 },
    { 'rank': '9', 'value': 9 },
    { 'rank': '10', 'value': 10 },
    { 'rank': 'Ace', 'value': 11 },
    { 'rank': 'Jack', 'value': 10 },
    { 'rank': 'Queen', 'value': 10 },
    { 'rank': 'King', 'value': 10 }
];

let deckOfCards = [];
let randomCard = 0;

let cardsPlayer = [];
let cardsDealer = [];


let passBoolean = false;

class Card {
    constructor(suit, rank, value) {
        this.suit = suit;
        this.rank = rank; 
        this.value = value;
    }
}

function generateDeckOfCards() {
    deckOfCards = [];

    for (i = 0; i < cardSuit.length; i++) {
        for (j = 0; j < cardRank.length; j++) {
            deckOfCards.push(new Card(cardSuit[i], cardRank[j].rank, cardRank[j].value));
        }
    }
    gameInit();
}

function dealCard() {
    let randomNumberInDeck = Math.floor(Math.random() * deckOfCards.length)
    randomCard = JSON.parse(JSON.stringify(deckOfCards[randomNumberInDeck])); // make a deep-copy of the card
    deckOfCards.splice(randomNumberInDeck, 1);
    return randomCard;
}

function checkForCardOf11Score(cards) {
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].value === 11) {
            return cards[i];
        }
    }
    return false;
}

function calculateScore(cards) {
    while ((score = cards.reduce(function (accumulator, card) {
        console.log(card);
        return accumulator + parseInt(parseInt(card.value)); 
    }, 0)) > 21 && (ace = checkForCardOf11Score(cards))) {
        ace.value = 1;
    }
    return score;
}

function hit() {
    cardsPlayer.push(dealCard());
    if (calculateScore(cardsDealer) < 17) {
        cardsDealer.push(dealCard());
    }
    displayCardsDealer();
    displayCardsPlayer();
    displayScore();
    checkForWin();
}

function pass() {
    passBoolean = true;
    while (calculateScore(cardsDealer) < 17) {
        cardsDealer.push(dealCard());
    }
    displayCardsDealer();
    displayCardsPlayer();
    displayScore();
    checkForWin();
    
}

function checkForWin() {
    if (calculateScore(cardsDealer) === 21) {
        document.getElementById('result').innerHTML = 'dealer wins';
        document.getElementById('draw-card').disabled=true;
        document.getElementById('pass').disabled=true;
    }
    if (calculateScore(cardsPlayer) === 21) {
        document.getElementById('result').innerHTML = 'player wins';
        document.getElementById('draw-card').disabled=true;
        document.getElementById('pass').disabled=true;
    }
    if (calculateScore(cardsPlayer) > 21) {
        document.getElementById('result').innerHTML = 'dealer wins';
        document.getElementById('draw-card').disabled=true;
        document.getElementById('pass').disabled=true;
    }
    if (calculateScore(cardsDealer) > 21) {
        document.getElementById('result').innerHTML = 'player wins';
        document.getElementById('draw-card').disabled=true;
        document.getElementById('pass').disabled=true;
    }
    if (calculateScore(cardsPlayer) === 21 && calculateScore(cardsDealer) === 21) {
        document.getElementById('result').innerHTML = 'dealer wins';
        document.getElementById('draw-card').disabled=true;
        document.getElementById('pass').disabled=true;
    }
    if (passBoolean && (calculateScore(cardsPlayer) < 22) && (calculateScore(cardsPlayer) > calculateScore(cardsDealer))) {
        document.getElementById('result').innerHTML = 'player wins';
        document.getElementById('draw-card').disabled=true;
        document.getElementById('pass').disabled=true;
    }
    if (passBoolean && (calculateScore(cardsDealer) < 22) && (calculateScore(cardsPlayer) < calculateScore(cardsDealer))) {
        document.getElementById('result').innerHTML = 'dealer wins';
        document.getElementById('draw-card').disabled=true;
        document.getElementById('pass').disabled=true;
    }
    if (passBoolean && (calculateScore(cardsDealer) === calculateScore(cardsPlayer))) {
        document.getElementById('result').innerHTML = 'tie';
        document.getElementById('draw-card').disabled=true;
        document.getElementById('pass').disabled=true;
    }
}

function displayCardsPlayer() {
    for (i = 0; i < cardsPlayer.length; i++) {
        document.getElementById('cards-player' + (i + 1)).src = './cards/' + cardsPlayer[i].suit + cardsPlayer[i].rank + ".svg"
    }
}

function displayCardsDealer() {
    for (i = 0; i < cardsDealer.length; i++) {
        document.getElementById('cards-dealer' + (i + 1)).src = './cards/' + cardsDealer[i]['suit'] + cardsDealer[i].rank + ".svg"
    }
}

function displayScore() {
    document.getElementById('dealer-score').innerHTML = 'score dealer: ' + calculateScore(cardsDealer);
    document.getElementById('player-score').innerHTML = 'score player: ' + calculateScore(cardsPlayer);
}

function resetGame(){
    location.reload();
}

function gameInit() {
    cardsDealer.push(dealCard());
    cardsDealer.push(dealCard());

    cardsPlayer.push(dealCard());
    cardsPlayer.push(dealCard());
    
    displayCardsDealer();
    displayCardsPlayer();
    displayScore();
    checkForWin();
}