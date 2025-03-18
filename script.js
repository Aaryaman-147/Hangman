const wordList = {
    easy: ['loop', 'array', 'script', 'debug', 'code'],
    medium: ['python', 'college', 'hangman', 'library', 'science'],
    hard: ['complication', 'astrophysics', 'interdisciplinary', 'debugging', 'algorithm']
};

const hints = {
    loop: "Repeats a block of code.",
    array: "A collection of elements.",
    script: "A file with executable code.",
    debug: "Fixing errors in code.",
    code: "Instructions for a computer.",
    python: "A popular programming language.",
    college: "A place for higher education.",
    hangman: "A word-guessing game.",
    library: "A collection of books or code.",
    science: "Systematic study of the world.",
    complication: "Something difficult to solve.",
    astrophysics: "Study of space physics.",
    interdisciplinary: "Combining multiple fields.",
    debugging: "Process of fixing code.",
    algorithm: "A step-by-step problem-solving method."
};

let selectedWord = "";
let maskedWord = [];
let attemptsLeft = 6;
let guessedLetters = [];
let darkMode = false;

// ASCII Hangman
const hangmanStages = [
    ` 
      +---+
      |   |
          |
          |
          |
          |
    =========
    `,
    ` 
      +---+
      |   |
      O   |
          |
          |
          |
    =========
    `,
    ` 
      +---+
      |   |
      O   |
      |   |
          |
          |
    =========
    `,
    ` 
      +---+
      |   |
      O   |
     /|   |
          |
          |
    =========
    `,
    ` 
      +---+
      |   |
      O   |
     /|\\  |
          |
          |
    =========
    `,
    ` 
      +---+
      |   |
      O   |
     /|\\  |
     /    |
          |
    =========
    `,
    ` 
      +---+
      |   |
      O   |
     /|\\  |
     / \\  |
          |
    =========
    `
];

function startGame(level) {
    document.getElementById("game").style.display = "block";
    document.getElementById("restart").style.display = "block";
    
    selectedWord = wordList[level][Math.floor(Math.random() * wordList[level].length)];
    maskedWord = Array(selectedWord.length).fill("_");
    attemptsLeft = 6;
    guessedLetters = [];

    document.getElementById("wordDisplay").textContent = maskedWord.join(" ");
    document.getElementById("attempts").textContent = attemptsLeft;
    document.getElementById("hangmanArt").textContent = hangmanStages[0];

    const lettersDiv = document.getElementById("letters");
    lettersDiv.innerHTML = "";
    for (let i = 97; i <= 122; i++) {
        let letter = String.fromCharCode(i);
        let btn = document.createElement("button");
        btn.textContent = letter;
        btn.onclick = () => guessLetter(letter);
        lettersDiv.appendChild(btn);
    }
}

function guessLetter(letter) {
    if (guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);

    if (selectedWord.includes(letter)) {
        selectedWord.split("").forEach((char, index) => {
            if (char === letter) maskedWord[index] = letter;
        });
    } else {
        attemptsLeft--;
        document.getElementById("hangmanArt").textContent = hangmanStages[6 - attemptsLeft];
    }

    document.getElementById("wordDisplay").textContent = maskedWord.join(" ");
    document.getElementById("attempts").textContent = attemptsLeft;

    if (attemptsLeft === 0) alert(`Game Over! The word was "${selectedWord}".`);
    if (!maskedWord.includes("_")) alert("You Win!");
}

document.getElementById("restart").onclick = () => location.reload();

document.querySelectorAll(".difficulty-btn").forEach(button => {
    button.onclick = () => startGame(button.dataset.level);
});

document.getElementById("darkModeToggle").onclick = () => {
    document.body.classList.toggle("dark-mode");
};

document.getElementById("getHint").onclick = () => {
    document.getElementById("hintText").textContent = hints[selectedWord] || "No hint available.";
};
