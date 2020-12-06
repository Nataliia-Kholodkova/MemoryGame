const images = ['img/apple-green.svg', 'img/blackberry.svg', 'img/blueberry.svg', 'img/cherry.svg', 'img/grape.svg', 'img/lingonberry.svg'];
const container = document.querySelector('.container-game');
let cards = [];
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

function containerUpdate() {
    shuffleArray(cards);
    cards.forEach(item => {
        item.setAttribute('class', 'card');
        container.appendChild(item)
    });
    starTime = new Date();
}

function loadGame() {
    for (let image of images) {
        cards.push(createCardItem(image));
        cards.push(createCardItem(image));
    }
    containerUpdate();
}

function reload() {
    container.innerHTML = '';
    containerUpdate();
}

function checkPair(cards) {
    return cards[0].querySelector('img').getAttribute('src') === cards[1].querySelector('img').getAttribute('src')
}

function removeFromGame(cards) {
    cards.forEach(item => item.classList.remove('toggled'));
    cards.forEach(item => item.classList.add('hidden'));
    if (checkWin()) {
        reload();
    }
}

function toggleClass(card) {
    card.classList.remove('toggled');
}

function checkWin() {
    const hiddens = Array.from(container.querySelectorAll('.card')).filter(card => card.classList.contains('hidden'));
    if (hiddens.length === 12) {
        endTime = new Date();
        const delta = Math.round((endTime - starTime) / 1000);
        alert(`Cool! You are the best =)
        Your time is ${delta} sec`);
        return true;
    }
    return false;
}

function toggle(event) {
    let card = event.target;
    while (!card.classList.contains('card')) {
        card = card.parentElement;
    }
    card.classList.toggle('toggled');
    const pair = cards.filter(item => item.classList.contains('toggled'));
    if (pair.length === 2) {
        if (checkPair(pair)) {
            setTimeout(function () {
                removeFromGame(pair)
            }, 400);

        } else {
            setTimeout(() => pair.forEach(item => toggleClass(item)), 400);
        }
    }
}

container.addEventListener('click', toggle);

loadGame();
