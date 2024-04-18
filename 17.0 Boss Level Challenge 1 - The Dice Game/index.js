// GENERATE RANDOM NUMBER
function randomNumber () {

    let randomNumber = 0;

    while(randomNumber == 0){
        randomNumber = Math.round(6 * Math.random());
    }

    return randomNumber;
}

let randomOne = randomNumber();
let randomTwo = randomNumber();

// CALL THE DOM OBJECTS
const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const h1 = document.querySelector('h1');

img1.setAttribute('src', `./images/dice${randomOne}.png`);
img2.setAttribute('src', `./images/dice${randomTwo}.png`);

// SET THE RESULT
if(randomOne > randomTwo){
    h1.innerText = "Player 1 Wins!";
}else if (randomTwo > randomOne){
    h1.innerText = "Player 2 Wins!";
}else {
    h1.innerText = "It is a draw!";
}