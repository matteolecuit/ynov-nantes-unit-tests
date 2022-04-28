const initMinesweeperBoard = (rows, columns) => {
  const board = [];
  for (let i = 0; i < columns; i++) {
    board.push([]);

    for (let j = 0; j < rows; j++) {
      board[i].push("");
    }
  }
  return board;
};

module.exports = {
  initMinesweeperBoard,
};
