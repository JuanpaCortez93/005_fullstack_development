const listItems = document.querySelectorAll('.list');
const thirdItem = listItems[2];
thirdItem.innerHTML = "This is my manipulation from DOM";
thirdItem.classList.add('redText');

const ancleTag = document.querySelector('.list a');
console.log(ancleTag);

const button = document.querySelector('button');
console.log(button)
button.style.background = "yellow";

document.querySelector('.list a').getAttribute('href');
document.querySelector('.list a').setAttribute('href', 'https://www.github.com');

