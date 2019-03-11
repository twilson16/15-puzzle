var moves = 0
var table
var rows
var columns
var textMoves
var arrayForBoard

function start () {
  var button = document.getElementById('newGame')
  console.log(button)
  button.addEventListener('"click"', startNewGame, false)
  textMoves = document.getElementById('moves')
  table = document.getElementById('table')
  rows = 4
  columns = 4
  startNewGame()
}

function startNewGame () {
  var arrayOfNumbers = []
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
        outputString += '<td class="tile" onclick="moveThisTile(' + i + ', ' + j + ')">' + arrayForBoard[i][j] + '</td>'
      }
      outputString += '</tr>'
    }
    table.innerHTML = outputString
  }
}

function moveThisTile (tableRow, tableColumn) {
  if (checkIfMoveable(tableRow, tableColumn, 'up') ||
  checkIfMoveable(tableRow, tableColumn, 'down') ||
  checkIfMoveable(tableRow, tableColumn, 'left') ||
  checkIfMoveable(tableRow, tableColumn, 'right')) {
    incrementMoves()
  }
  if (checkIfWinner()) {
    alert('Congratulations! You solve the puzzle in' + moves + 'moves!')
  }
  startNewGame()
}

function checkIfMoveable (rowCoordinate, columnCoordinate, direction) {
  let rowOffset = 0
  let columnOffset = 0
  if (direction == 'up') {
    rowOffset = -1
  } else if (direction == 'down') {
    rowOffset = 1
  } else if (direction == 'left') {
    columnOffset = -1
  } else if (direction == 'right') {
    columnOffset = 1
  }

  if (rowCoordinate + rowOffset >= 0 &&
    columnCoordinate + columnOffset >= 0 &&
   rowCoordinate + rowOffset < rows &&
   columnCoordinate + columnOffset < columns
  ) {
    if (arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] == 0) {
      arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] = arrayForBoard[rowCoordinate][columnCoordinate]
      arrayForBoard[rowCoordinate][columnCoordinate] = 0
      showTable()
      return true
    }
  }
  return false
}

function checkIfWinner () {
  var count = 1
  for (var i = 0; i < rows; i++) {
    if (arrayForBoard[i][j] != count) {
      if (!(count === rows * columns && arrayForBoard[i][j] === 0)) {
        return false
      }
    }
    count++
  }
}

function incrementMoves () {
  moves++
  if (textMoves) {
    textMoves.innerHTML = moves
  }
}

window.addEventListener('load', start, false)
