const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach((cell) => cell.addEventListener("click", () =>{
        const cellIndex = cell.getAttribute("cellIndex");
        console.log(cellIndex)
        if(options[cellIndex] != "" || !running) return;
        updateCell(cell, cellIndex);
        checkWinners();
    }));
    restartBtn.addEventListener("click", () =>{
        currentPlayer = "X";
        statusText.textContent = `${currentPlayer}'s turn`
        running = true;
        options = ["", "", "", "", "", "", "", "", ""];
        cells.forEach((cell) => cell.textContent ="")
});
    statusText.textContent = `${currentPlayer}'s turn`
    running = true;
}
 function updateCell(text, cellIndex){
        options[cellIndex] = currentPlayer;
        text.textContent = currentPlayer;
        console.log(options[cellIndex]);

 }

function ChangePlayer(){
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinners(){
    let RoundWon = false;
    for( i = 0; i < winConditions.length ; i++ ){
        // condition = [0, 1, 2] then [3, 4, 5] and so on until last winCondition
        //let's do example with condition = [3, 4, 5]
        let condition = winConditions[i];
        // cellA = options[3]
        let cellA = options[condition[0]];
        // cellB = options[4]
        let cellB = options[condition[1]];
        // cellC = options[5]
        let cellC = options[condition[2]];
        //condition that the game wouldn't end just when we start
        if(cellA == ''){
            continue;
        }
        // if cellA, cellB and cellC all are 'X' or all 'O' then we have a winner
        if(cellA == cellB && cellB == cellC){
             RoundWon = true;
             break;
        }
    }

    if(RoundWon){
        statusText.textContent = `${currentPlayer} has won the game`;
        running= false;
    }
    else if(!options.includes('')){
        statusText.textContent = "It's a draw!";
        running = false;
        }
    else{
        ChangePlayer();
    }
}
