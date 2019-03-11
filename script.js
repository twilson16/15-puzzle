var moves = 0
var table
var rows
var columns
var textMoves
var arrayForBoard

function start () {
  var button = document.getElementById('newGame')
  button.addEventListener('click', startNewGame, false)
  textMoves = document.getElementById('moves')
  table = document.getElementById('table')
  rows = 4
  columns = 4
  startNewGame()
}

function startNewGame () {
  var arrayOfNumbers = new Array()
  var arrayHasNumberBeenUsed
  var randomNumber
  var count = 0
  moves = 0
  rows = document.getElementById('rows').value
  columns = document.getElementById('columns').value
  textMoves.innerHTML = moves

  // Create proper board size
  arrayForBoard = new Array(rows)
  for (var i = 0; i < rows; i++) {
    arrayForBoard[i] = new Array(columns)
  }

  // Temporary array for allocating unique numbers
  arrayHasNumberBeenUsed = new Array(rows * columns)
  for (var i = 0; i < rows * columns; i++) {
    arrayHasNumberBeenUsed[i] = 0
  }

  // Assign random numbers to board
  for (var i = 0; i < rows * columns; i++) {
    randomNumber = Math.floor(Math.random() * rows * columns)

    // If number unique, add to the board
    if (arrayHasNumberBeenUsed[randomNumber] == 0) {
      arrayHasNumberBeenUsed[randomNumber] = 1
      arrayOfNumbers.push(randomNumber)
    } else {
      // try again
      i--
    }

    // Assign numbers to game board
    count = 0
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        arrayForBoard[i][j] = arrayOfNumbers[count]
        count++
      }
    }
    showTable()
  }
}

function showTable () {
  var outputString = ''
  for (var i = 0; i < rows; i++) {
    outputString += '<tr>'
    for (var j = 0; j < columns; j++) {
      if (arrayForBoard[i][j] == 0) {
        outputString = +'td class="blank"> </td>'
      } else {
        outputString += '<td class="tile" onclick="moveThisTile(' + i + ', ' + j + ')">' + arrayForBoard[i][j] + '</td>';
      }
      outputString += '</tr>'
    }
    table.innerHTML = outputString
  }
}
