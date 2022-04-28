const { initMinesweeperBoard, minesweeperBoardReader } = require("../src");
const { itemSet } = require("../src/constants");

const inputInitData = [
  { rows: 0, columns: 0 },
  { rows: 3, columns: 3 },
  { rows: 5, columns: 2 },
  { rows: 7, columns: 5 },
  { rows: 4, columns: 9 },
];

describe.each(inputInitData)("Init minesweeper board", (data) => {
  test(`Board should have ${data.rows} rows and ${data.columns} columns`, () => {
    const board = initMinesweeperBoard(data.rows, data.columns);
    expect(board.length).toBe(data.columns);
    board.forEach((column) => {
      for (const item of column) {
        expect(item).not.toBe(null);
      }
    });
  });
});

const isValidItem = (item) => {
  return Object.values(itemSet).includes(item);
};

test("board should have valid items", () => {
  const board = initMinesweeperBoard(5, 5);
  board.forEach((column) => {
    for (const item of column) {
      expect(isValidItem(item)).toBe(true);
    }
  });
});

const inputCheckBoard = [
  {
    board: [
      ["*", ".", "."],
      [".", ".", "."],
      [".", ".", "."],
    ],
    expectedBoard: [
      ["*", "1", "0"],
      ["1", "1", "0"],
      ["0", "0", "0"],
    ],
  },
];

describe.each(inputCheckBoard)("items should display hints", (data) => {
  test(`${data.board} should return ${data.expectResults}`, () => {
    for (let x = 0; x < data.board.length; x++) {
      const column = data.board[x];
      for (let y = 0; y < column.length; y++) {
        expect(minesweeperBoardReader(data.board, x, y)).toBe(
          data.expectedBoard[x][y]
        );
      }
    }
  });
});
