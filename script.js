const newGameButton = document.querySelector('.new-game');
const cells = document.querySelectorAll('.table>div');

const twoOpenedCards = [];
const openCardImg = [];
const openCardText = [];
function game() {
    const imgsArray = ['apple.webp', 'apple.webp',
        'apricot.webp', 'apricot.webp',
        'banana.webp', 'banana.webp',
        'cherry.webp', 'cherry.webp',
        'grapes.webp', 'grapes.webp',
        'mango.webp', 'mango.webp',
        'orange.webp', 'orange.webp',
        'pear.webp', 'pear.webp',
        'raspberry.webp', 'raspberry.webp',
        'strawberry.webp', 'strawberry.webp'];




    cells.forEach((cell, index) => {
        const randomIndex = Math.floor(Math.random() * imgsArray.length);
        cell.innerHTML = `
            <p>Open</p>
            <img src="./imgs/fruits-img/${imgsArray[randomIndex]}">
            `;
        imgsArray.splice(randomIndex, 1);

        cell.addEventListener('click', () => cardClick(cell, index))
    })
}
game();

let buttonBlock = false;
function cardClick(cell, index) {
    if (buttonBlock !== false) {
        return
    }

    const imgs = document.querySelectorAll('.table>div>img');
    const openText = document.querySelectorAll('.table>div>p');

    if (cell.classList.contains('flipped')) {
        return
    }
    openText[index].style.display = 'none';
    imgs[index].style.display = 'block';
    cell.classList.add('flipped');
    twoOpenedCards.push(cell);
    openCardImg.push(imgs[index]);
    openCardText.push(openText[index]);

    if (twoOpenedCards.length == 2) {
        if (openCardImg[0].src != openCardImg[1].src) {
            buttonBlock = true;
            setTimeout(() => {
                for (let i = 0; i <= 1; i++) {
                    twoOpenedCards[i].classList.remove('flipped');
                    openCardImg[i].style.display = 'none';
                    openCardText[i].style.display = 'block';
                }
                twoOpenedCards.splice(0, twoOpenedCards.length);
                openCardImg.splice(0, openCardImg.length);
                openCardText.splice(0, openCardText.length);
                buttonBlock = false;
            }, 1000)
        } else if (openCardImg[0].src == openCardImg[1].src) {
            twoOpenedCards.splice(0, twoOpenedCards.length);
            openCardImg.splice(0, openCardImg.length);
            openCardText.splice(0, openCardText.length);
            setTimeout(() => {
                win(cells);
            }, 200)
        }
    }
}

function win(cells) {
    const main = document.getElementById('main');
    const cellsArray = Array.from(cells);
    if (cellsArray.every(cell => cell.classList.contains('flipped'))) {
        const winText = document.createElement('div');
        winText.classList.add('win-text');
        winText.innerHTML = `
            <h1>YOU WIN</h1>
            <button onclick="newGame()">New game</button>
        `;
        main.append(winText);
    }
}

function newGame() {
    const winText = document.querySelector('.win-text');
    if (winText) {
        winText.remove();
    }

    cells.forEach((cell) => {
        cell.innerHTML = '';
        cell.classList.remove('flipped');
    })

    twoOpenedCards.splice(0, twoOpenedCards.length);
    openCardImg.splice(0, openCardImg.length);
    openCardText.splice(0, openCardText.length);
    game();
}
