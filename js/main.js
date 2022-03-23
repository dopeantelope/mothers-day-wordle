import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let gameCount = 0;
let rightGuessString = WORDS[gameCount]

function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"

        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }
        board.appendChild(row)
    }
}

initBoard()

document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})


function insertLetter(pressedKey) {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    animateCSS(box, "pulse")
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

function nextLevel() {
    gameCount = gameCount + 1
    console.log("inside next level" + gameCount);
    guessesRemaining = 6;
    rightGuessString = WORDS[gameCount];
    console.log("next word" + rightGuessString);
    currentGuess = [];
    nextLetter = 0;
    resetBoard();
    document.getElementById('modal').style.visibility = 'hidden'
}
function resetBoard() {
    //clear grid
    document.getElementById("game-board").innerHTML = ("");
    initBoard();
    //reset colour of keyboard
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        elem.style.backgroundColor = "rgb(243, 243, 243)"
    }
}

function showStatsView() {
    document.getElementById('modal').style.visibility = 'hidden'
    document.getElementById("game-board").innerHTML = ("");
    resetBoard();
    let wordsArray = ["l", "o"]
    let boxs = document.getElementsByClassName("letter-box")
    for (var i = 0; i < boxs.length; i++) {
        //for(let i = 0; i< wordsArray.length; i++){
        // console.log(wordsArray[i])
        boxs[0].innerHTML = "F"
        boxs[1].innerHTML = "U"
        boxs[2].innerHTML = "N"
        boxs[3].innerHTML = "N"
        boxs[4].innerHTML = "Y"
        boxs[5].innerHTML = "S"
        boxs[6].innerHTML = "U"
        boxs[7].innerHTML = "P"
        boxs[8].innerHTML = "E"
        boxs[9].innerHTML = "R"
        boxs[10].innerHTML = "S"
        boxs[11].innerHTML = "M"
        boxs[12].innerHTML = "A"
        boxs[13].innerHTML = "R"
        boxs[14].innerHTML = "T"

    }
}


function checkGuess() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        toastr.error("Not enough letters!")
        return
    }

    if (!WORDS.includes(guessString)) {
        toastr.error("Word not in list!")
        return
    }


    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]

        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = '#666'
        } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position 
            if (currentGuess[i] === rightGuess[i]) {
                // shade #71C562 
                letterColor = '#71C562'
            } else {
                // shade box #FFD700
                letterColor = '#FFD700'
            }

            rightGuess[letterPosition] = "#"
        }

        let delay = 600 * i
        setTimeout(() => {
            //flip box
            animateCSS(box, 'flipInY')
            //shade box
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === rightGuessString) {
        document.getElementById('win-modal').style.visibility = 'visible'
        if (gameCount < 1) {
            document.getElementById("next-level-button").addEventListener("click", nextLevel)
            document.getElementById("view-stats-button").style.visibility = "hidden"
        }
        else {
            document.getElementById("next-level-button").style.visibility = "hidden"
            document.getElementById("view-stats-button").style.visibility = "visible"
            document.getElementById("view-stats-button").addEventListener("click", showStatsView)

        }
        //add delay on modal
        // toastr.success("You guessed right! Game over! ")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            document.getElementById('lose-modal').style.visibility = 'visible'
            if (gameCount < 1) {
                document.getElementById("next-level-button").addEventListener("click", nextLevel)
                document.getElementById('actualWord').innerHTML = `The right word was: "${rightGuessString}"`
                document.getElementById("view-stats-button").style.visibility = "hidden"
            }
            else {
                document.getElementById("next-level-button").style.visibility = "hidden"
                document.getElementById("view-stats-button").style.visibility = "visible"
                document.getElementById('actualWord').innerHTML = `The right word was: "${rightGuessString}"`
                document.getElementById("view-stats-button").addEventListener("click", showStatsView)

            }
            // toastr.error("You've run out of guesses! Game over!")
            //toastr.info(`The right word was: "${rightGuessString}"`)
        }
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === '#71C562') {
                return
            }

            if (oldColor === '#FFD700' && color !== '#71C562') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}


document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target

    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    }

    document.dispatchEvent(new KeyboardEvent("keyup", { 'key': key }))
})


const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        // const node = document.querySelector(element);
        const node = element
        node.style.setProperty('--animate-duration', '0.5s');

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });