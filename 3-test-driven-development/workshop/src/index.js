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

const minesweeperBoardReader = (minesweeperBoard, x, y) => {
  return [];
};

module.exports = {
  initMinesweeperBoard,
  minesweeperBoardReader,
};
