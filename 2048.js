function initBoard() {
    let n = prompt("How many rows and columns do you want?", "4");
    if (n == null) {
        n = 4;
    }
    while (n < 2 || n > 20) {
        alert("Please enter a number between 2 and 20");
        n = prompt("How many rows and columns do you want?", "4");
    }
    rowNum = n;
    columnNum = n;
    board = new Array(rowNum);
    for (var i = 0; i < rowNum; i++) {
        board[i] = new Array(columnNum);
    }
    for (var i = 0; i < rowNum; i++) {
        for (var j = 0; j < columnNum; j++) {
            board[i][j] = 0;
        }
    }
    score = 0;

}
        
function updateTile(num, tile) {
    tile.classList.value = "";
    tile.innerText = "";
    tile.classList.add("tile");
    if (num >= 2) {
        tile.classList.add("t" + num);
        tile.innerText = num;
    }
} 

function removeZeros(row) {
    return row.filter(element => element != 0);
}

function updateHTML() {
    //update html
    for (var m = 0; m < rowNum; m++) {
        for (var n = 0; n < columnNum; n++) {
            var oldTile = document.getElementById(m + "-" + n);
            updateTile(board[m][n], oldTile);
        }
    }
    document.getElementById("score").innerHTML = score;
}

function slideLeft() {
    let hasChange = false;

    for (var i = 0; i < rowNum; i++) {
        var row = board[i];

        let oldRow = row;

        row = removeZeros(row);

        for (var j = 0; j < row.length - 1; j++) {
            if (row[j] == row[j + 1]) {
                row[j] *= 2;
                row[j + 1] = 0;
                score += row[j];
            }
        }

        row = removeZeros(row);

        for (var k = row.length; k < columnNum; k++) {
            row.push(0);
        }

        for (let p = 0; p < columnNum; p++) {
            if (row[p] != oldRow[p]) {
                hasChange = true;
            }
        }

        //update matrix
        board[i] = row;
    }

    updateHTML();

    if (hasChange) {
        createTile();
    }

}

function slideRight() {
    let hasChange = false;

    for (var i = 0; i < rowNum; i++) {
        var row = board[i];

        let oldRow = row;

        row = removeZeros(row);

        for (var j = 0; j < row.length - 1; j++) {
            if (row[row.length - 1 - j] == row[row.length - 2 - j]) {
                row[row.length - 1 - j] *= 2;
                row[row.length - 2 - j] = 0;
                score += row[row.length - 1 - j];
            }
        }

        row = removeZeros(row);

        for (var k = row.length; k < columnNum; k++) {
            row.unshift(0);
        }

        for (let p = 0; p < columnNum; p++) {
            if (row[p] != oldRow[p]) {
                hasChange = true;
            }
        }

        //update matrix
        board[i] = row;
    }

    updateHTML();

    if (hasChange) {
        createTile();
    }
  
}

function slideUp() {
    let hasChange = false;

    for (var i = 0; i < columnNum; i++) {
        var row = new Array();
        for (var j = 0; j < rowNum; j++) {
            row.push(board[j][i]);
        }

        let oldRow = row;

        // debugger;

        row = removeZeros(row);
        
        for (var k = 0; k < row.length - 1; k++) {
            if (row[k] == row[k + 1]) {
                row[k] *= 2;
                row[k + 1] = 0;
                score += row[k];
            }
        }

        row = removeZeros(row);

        for (var m = row.length; m < columnNum; m++) {
            row.push(0);
        }

        for (let p = 0; p < rowNum; p++) {
            if (row[p] != oldRow[p]) {
                hasChange = true;
            }
        }

        for (var n = 0; n < rowNum; n++) {
            board[n][i] = row[n];
        }
    }

    updateHTML();

    if (hasChange) {
        createTile();
    }
   
}

function slideDown() {
    let hasChange = false;

    for (var i = 0; i < columnNum; i++) {
        var row = new Array();
        for (var j = rowNum-1; j >= 0; j--) {
            row.push(board[j][i]);
        }

        let oldRow = row;

        // debugger;

        row = removeZeros(row);
        
        for (var k = 0; k < row.length - 1; k++) {
            if (row[k] == row[k + 1]) {
                row[k] *= 2;
                row[k + 1] = 0;
                score += row[k];
            }
        }

        row = removeZeros(row);

        for (var m = row.length; m < columnNum; m++) {
            row.push(0);
        }

        for (let p = 0; p < rowNum; p++) {
            if (row[p] != oldRow[p]) {
                hasChange = true;
            }
        }

        for (var n = 0; n < rowNum; n++) {
            board[rowNum - 1 - n][i] = row[n];
        }
    }

    updateHTML();
 
    if (hasChange) {
        createTile();
    }
}

function checkAdjacentTile(row, column) {
    // check left tile
    if (column - 1 >= 0) {
        if (board[row][column] == board[row][column - 1]) {
            return true;
        }
    }

    // check right tile
    if (column + 1 < columnNum) {
        if (board[row][column] == board[row][column + 1]) {
            return true;
        }
    }

    // check upper tile
    if (row - 1 >= 0) {
        if (board[row][column] == board[row - 1][column]) {
            return true;
        }
    }

    // check down tile
    if (row + 1 < rowNum) {
        if (board[row][column] == board[row + 1][column]) {
            return true;
        }
    }
}

function gameOver() {
    for (let i = 0; i < rowNum; i++) {
        for (let j = 0; j < columnNum; j++) {
            if (board[i][j] == 2048) {
                alert("Congs! You've succeeded in making a 2048!");
                return;
            }
        }
    }

    let goOn = false;
    for (let m = 0; m < rowNum; m++) {
        for (let n = 0; n < columnNum; n++) {
            if (board[m][n] == 0) {
                return;
            }
            if (checkAdjacentTile(m, n)) {
                goOn = true;
            }
        }
    }

    if (!goOn) {
        // updateHTML();
        alert("You've failed. Click on 'New Game' to try again!");
        // alert("You've failed. Click on 'OK' to try again!",'',function(){
        //     location.reload(true);
        // })
    }
}

function createTile() {
    var hasEmptyTile = false;
    for (var m = 0; m < rowNum; m++) {
        for (var n = 0; n < columnNum; n++) {
            if (board[m][n] == 0) {
                hasEmptyTile = true;
            }
        }
    }

    if (!hasEmptyTile) {
        return;
    }

    var foundEmptyTile = false;
    while (!foundEmptyTile) {
        var row = Math.floor(Math.random() * rowNum);
        var column = Math.floor(Math.random() * columnNum);

        if (board[row][column] == 0) {
            var twoOrFour = Math.random();
            var tileNum = 2;
            if (twoOrFour > 0.9) {
                tileNum = 4;
            }
            board[row][column] = tileNum;

            var tile = document.getElementById(row + "-" + column);
            tile.classList.add("t" + tileNum);
            tile.innerText = tileNum;

            foundEmptyTile = true;
        }
    }

}

function adjustWindowSize() {
    if (rowNum>6){
        
        var percentage = 6/rowNum;

        document.getElementById("board").style.width = 600 + "px";
        document.getElementById("board").style.height = 600 + "px";
    
        var tileSize = percentage * 90 + "px";
        var tileBorder = percentage * 5 + "px solid #bbada0";
        var tileFont = percentage * 200 + "%";

        for (var m = 0; m < rowNum; m++) {
            for (var n = 0; n < columnNum; n++) {
                var tile = document.getElementById(m + "-" + n);
                tile.style.width = tileSize;
                tile.style.height = tileSize;
                tile.style.border = tileBorder;
                tile.style.fontSize = tileFont;
            }
        }
    }
}


// initializing game
initBoard();

document.getElementById("board").style.width = columnNum * 100 + "px";
document.getElementById("board").style.height = rowNum * 100 + "px";


for (var i = 0; i < rowNum; i++) {
    for (var j = 0; j < columnNum; j++) {
        var num = board[i][j];
        var tile = document.createElement("div");
        tile.setAttribute('id', i.toString() + "-" + j.toString());

        updateTile(num, tile);

        document.getElementById("board").appendChild(tile);
    }
}

adjustWindowSize();

createTile();
createTile();

document.addEventListener("keyup", (event) => {
    switch (event.code) {
        case "ArrowUp":
            slideUp();
            //createTile();
            gameOver();
            break;
        case "ArrowDown":
            slideDown();
            //createTile();
            gameOver();
            break;
        case "ArrowLeft":
            slideLeft();
            //createTile();
            gameOver();
            break;
        case "ArrowRight":
            slideRight();
            //createTile();
            gameOver();
            break;
    }
})