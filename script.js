document.addEventListener("DOMContentLoaded", () => {
    const gameBoardElement = document.getElementById("game-board");
    const restartButton = document.getElementById("restart-btn");

    let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    let currentPlayer = "X";
    let gameOver = false;

    function printBoard() {
        gameBoardElement.innerHTML = "";
        for (let i = 0; i < 3; i++) {
            const rowElement = document.createElement("div");
            rowElement.className = "row";

            for (let j = 0; j < 3; j++) {
                const cellIndex = i * 3 + j;
                const cellElement = document.createElement("div");
                cellElement.className = "cell";
                cellElement.innerText = board[cellIndex];
                cellElement.addEventListener("click", () => handleCellClick(cellIndex));
                rowElement.appendChild(cellElement);
            }

            gameBoardElement.appendChild(rowElement);
        }
    }

    function handleCellClick(index) {
        if (board[index] === " " && !gameOver) {
            board[index] = currentPlayer;
            printBoard();
            checkWinner();
            togglePlayer();
        }
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] !== " " && board[a] === board[b] && board[a] === board[c]) {
                gameOver = true;
                alert(`Player ${board[a]} wins!`);
                break;
            }
        }

        if (!board.includes(" ") && !gameOver) {
            gameOver = true;
            alert("It's a tie!");
        }
    }

    function restartGame() {
        board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        currentPlayer = "X";
        gameOver = false;
        printBoard();
    }

    printBoard();
    restartButton.addEventListener("click", restartGame);
});
