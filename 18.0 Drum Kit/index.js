const audios = [
    new Audio('./sounds/tom-1.mp3'),
    new Audio('./sounds/tom-2.mp3'),
    new Audio('./sounds/tom-3.mp3'),
    new Audio('./sounds/tom-4.mp3'),
    new Audio('./sounds/crash.mp3'),
    new Audio('./sounds/kick-bass.mp3'),
    new Audio('./sounds/snare.mp3')
];

const images = [
    './sounds/tom-1.mp3',
    './sounds/tom-2.mp3',
    './sounds/tom-3.mp3',
    './sounds/tom-4.mp3',
    './sounds/crash.mp3',
    './sounds/kick-bass.mp3',
    './sounds/snare.mp3'
];

const playSound = (drumType) => {
    switch(drumType){
        case 'w':
            audios[0].play();
            break;

        case 'a':
            audios[1].play();
            break;

        case 's':
            audios[2].play();
            break;

        case 'd':
            audios[3].play();
            break;

        case 'j':
            audios[4].play();
            break;
   
        case 'k':
            audios[5].play();
            break;

        case 'l':
            audios[6].play();
            break;

        default:
            console.log('Dont apply');
            break;
    }
}

const buttons = document.querySelectorAll("button");

buttons.forEach(button => button.addEventListener('click', () => {
    const drumType = button.getAttribute('class')[0];
    playSound(drumType);    
})
);

document.addEventListener('keydown', (e) => {
    let keyDrumType = e.key;
    playSound(keyDrumType); 
});

