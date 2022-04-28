const {
  initMinesweeperBoard,
  minesweeperBoardReader,
  getSurroundingMines,
  initMinesweeperBoardFromTemplate,
} = require("../src");
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

const inputSurroundingMines = [
  {
    board: [
      [".", "."],
      ["*", "."],
    ],
    expectedBoard: [
      ["1", "1"],
      ["*", "1"],
    ],
  },
  {
    board: [
      [".", ".", "."],
      [".", ".", "*"],
      ["*", ".", "."],
      [".", ".", "."],
    ],
    expectedBoard: [
      ["0", "1", "1"],
      ["1", "2", "*"],
      ["*", "2", "1"],
      ["1", "1", "0"],
    ],
  },
  {
    board: [
      ["*", ".", ".", ".", ".", "."],
      ["*", ".", ".", ".", ".", "."],
      [".", ".", "*", "*", "*", "*"],
      [".", ".", ".", ".", ".", "*"],
      [".", ".", ".", ".", ".", "."],
    ],
    expectedBoard: [
      ["*", "2", "0", "0", "0", "0"],
      ["*", "3", "2", "3", "3", "2"],
      ["1", "2", "*", "*", "*", "*"],
      ["0", "1", "2", "3", "4", "*"],
      ["0", "0", "0", "0", "1", "1"],
    ],
  },
];

describe.each(inputSurroundingMines)(
  "get surrounding mines one by one",
  (data) => {
    test(`${data.board} should return ${data.expectedBoard}`, () => {
      for (let x = 0; x < data.board.length; x++) {
        const column = data.board[x];
        for (let y = 0; y < column.length; y++) {
          expect(getSurroundingMines(data.board, x, y)).toBe(
            data.expectedBoard[x][y]
          );
        }
      }
    });
  }
);

const inputBoardHints = [
  {
    board: [
      [".", "."],
      ["*", "."],
    ],
    expectedBoard: [
      ["1", "1"],
      ["*", "1"],
    ],
  },
  {
    board: [
      [".", ".", "."],
      [".", ".", "*"],
      ["*", ".", "."],
      [".", ".", "."],
    ],
    expectedBoard: [
      ["0", "1", "1"],
      ["1", "2", "*"],
      ["*", "2", "1"],
      ["1", "1", "0"],
    ],
  },
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
  {
    board: [
      ["*", ".", ".", ".", ".", "."],
      ["*", ".", ".", ".", ".", "."],
      [".", ".", "*", "*", "*", "*"],
      [".", ".", ".", ".", ".", "*"],
      [".", ".", ".", ".", ".", "."],
    ],
    expectedBoard: [
      ["*", "2", "0", "0", "0", "0"],
      ["*", "3", "2", "3", "3", "2"],
      ["1", "2", "*", "*", "*", "*"],
      ["0", "1", "2", "3", "4", "*"],
      ["0", "0", "0", "0", "1", "1"],
    ],
  },
];

describe.each(inputBoardHints)("get whole board hints", (data) => {
  test(`${data.board} should return ${data.expectedBoard}`, () => {
    const board = minesweeperBoardReader(data.board);
    expect(board).toEqual(data.expectedBoard);
  });
});

const inputInitFromTemplate = [
  {
    input: ["4 4", "*...", "....", ".*..", "...."],
    expectedOutput: ["Field #1", "*1000", "2210", "1*10", "1110", ""],
  },
];

describe.each(inputInitFromTemplate)("init board from template", (data) => {
  test(`${data.input} should output ${data.expectedOutput}`, () => {
    const output = initMinesweeperBoardFromTemplate(data.input);
    expect(output).toEqual(data.expectedOutput);
  });
});
