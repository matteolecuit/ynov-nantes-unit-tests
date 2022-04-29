const deepCopy = require("deepcopy");
const { itemSet } = require("./constants");

const initMinesweeperBoardFromTemplate = (data) => {
  if (data.length < 1) return;

  const [boardNbRows, boardNbCols] = getOneBoardConfig(data, 0);
  console.log(boardNbCols, boardNbRows);
  let board = [];
  for (let i = 0; i < boardNbRows; i++) {
    board.push(getRowFromString(data[i + 1], boardNbCols));
  }
  console.log(board);
  return board;
};

const getRowFromString = (rowAsString, nbOfColumns) => {
  console.log(rowAsString.length, nbOfColumns);
  if (rowAsString.length !== nbOfColumns) throw "Unexpected row data";
  return rowAsString;
};

const getOneBoardConfig = (data, index) => {
  const config = data[index].split(" ");
  let rows = Number(config[0] || 0);
  let columns = Number(config[1] || 0);
  return [rows, columns];
};

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

const generateBoardFromBoardAsString = (data) => {
  const outputBoard = [];
  data.forEach((row) => {
    outputBoard.push(row.split(""));
  });
  return outputBoard;
};

const minesweeperBoardReader = (inputBoard) => {
  let answerBoard = deepCopy(inputBoard);
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
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const item = getItem(board, x + i, y + j);
      if (item == itemSet.mine) counter++;
    }
  }
  return String(counter);
};

const getItem = (board, x, y) => {
  return x >= 0 && y >= 0 && x <= board.length - 1 && y <= board[0].length - 1
    ? board[x][y]
    : undefined;
};

module.exports = {
  initMinesweeperBoard,
  minesweeperBoardReader,
  getSurroundingMines,
  initMinesweeperBoardFromTemplate,
  generateBoardFromBoardAsString,
};
