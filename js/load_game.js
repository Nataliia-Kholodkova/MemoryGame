const images = ['img/apple-green.svg', 'img/blackberry.svg', 'img/blueberry.svg', 'img/cherry.svg', 'img/grape.svg', 'img/lingonberry.svg'];
const container = document.querySelector('.container-game');
let starTime;
let endTime;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCardItem(image) {
    const cardItem = document.createElement('div');
    cardItem.classList.add('card');
    const div_front = document.createElement('div');
    div_front.classList.add('front');
    const img = document.createElement('img');
    img.classList.add('card-image');
    img.setAttribute('src', image);
    div_front.appendChild(img);
    const div_back = document.createElement('div');
    div_back.classList.add('back');
    cardItem.appendChild(div_front);
    cardItem.appendChild(div_back);
    return cardItem;
}

function loadGame() {
    let cardItems = [];
    for (let image of images) {
        cardItems.push(createCardItem(image));
        cardItems.push(createCardItem(image));
    }
    shuffleArray(cardItems);
    cardItems.forEach(item => container.appendChild(item));
    starTime = new Date();
}

function reload() {
    container.innerHTML = '';
    loadGame();
}

loadGame();
