const { f1 } = require("../src");

describe("Minesweeper", () => {
  it("should initialize", () => {
    expect(f1()).toBe(1);
  });
});
