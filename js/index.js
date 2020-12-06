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
        alert('Cool! You are the best =)');
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
    pair = container.querySelectorAll('.toggled');
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
