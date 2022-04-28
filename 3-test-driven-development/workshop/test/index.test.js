const { initMinesweeperBoard } = require("../src");

const inputInitData = [
  {
    rows: 3,
    columns: 3,
  },
  {
    rows: 5,
    columns: 2,
  },
  {
    rows: 7,
    columns: 5,
  },
  {
    rows: 4,
    columns: 9,
  },
];

describe.each(inputInitData)("Init minesweeper board", (data) => {
  test(`Board should have ${data.rows} rows and ${data.columns} columns`, () => {
    const board = initMinesweeperBoard(data.rows, data.columns);
    console.log("🦕 -> file: index.test.js -> line 25 -> test -> board", board);
    expect(board.length).toBe(data.columns);
    board.forEach((column) => {
      for (const item of column) {
        expect(item).not.toBe(null);
      }
    });
  });
});
