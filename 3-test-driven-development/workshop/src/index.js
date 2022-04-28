const { itemSet } = require("./constants");

const initMinesweeperBoard = (rows, columns) => {
  const probability = 0.3;
  return new Array(columns).fill([]).map((x) => {
    const row = [];
    for (let i = 0; i < rows; i++) {
      row.push(populateItem(probability));
    }
    return row;
  });
};

const populateItem = (chanceOfMinesAppearing = 0.1) => {
  return Math.random() > chanceOfMinesAppearing ? itemSet.empty : itemSet.mine;
};

const minesweeperBoardReader = (inputBoard) => {
  let answerBoard = inputBoard;
  for (let i = 0; i < inputBoard.length; i++) {
    for (let j = 0; j < inputBoard[i].length; j++) {
      if (inputBoard[i][j] != itemSet.mine) {
        answerBoard[i][j] = getSurroundingMines(inputBoard, i, j);
      }
    }
  }
  return answerBoard;
};

const getSurroundingMines = (board, x, y) => {
  if (board[x][y] === itemSet.mine) return itemSet.mine;
  let counter = 0;
  for (let i = -1; i !== 1; i++) {
    for (let j = -1; j !== 1; j++) {
      const item = getItem(board, x + i, y + j);
      if (item == itemSet.mine) counter++;
    }
  }
  return String(counter);
};

const getItem = (board, x, y) => {
  if (x >= 0 && y >= 0 && x <= board.length && y <= board[0].length)
    return board[x][y];
  return undefined;
};

module.exports = {
  initMinesweeperBoard,
  minesweeperBoardReader,
  getSurroundingMines,
};
