const {
  nonPerishableItemNames,
  legendaryItemNames,
} = require("../src/constants");
const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", () => {
  test("quality degradation", () => {
    const gildedRose = new Shop([new Item("basic item", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(9);
  });

  test("quality double degradation after sellIn", () => {
    const gildedRose = new Shop([new Item("basic item", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(8);
  });
});

const negativeQualityData = [
  {
    item: new Item("Zero value item", 10, 0),
    qualityExpected: 0,
  },
  {
    item: new Item("Negative value item", 0, -5),
    qualityExpected: 0,
  },
];

describe.each(negativeQualityData)(
  `Quality degradation not negative`,
  (data) => {
    test(`Item quality of ${data.item.quality} should be greater or equal to ${data.qualityExpected}`, () => {
      const gildedRose = new Shop([data.item]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBeGreaterThanOrEqual(data.qualityExpected);
    });
  }
);

const agedBrieData = [
  {
    item: new Item(nonPerishableItemNames.agedBrie, 10, 0),
    qualityExpected: 1,
  },
  {
    item: new Item(nonPerishableItemNames.agedBrie, 10, 1),
    qualityExpected: 2,
  },
  {
    item: new Item(nonPerishableItemNames.agedBrie, 10, 49),
    qualityExpected: 50,
  },
  {
    item: new Item(nonPerishableItemNames.agedBrie, 10, 60),
    qualityExpected: 50,
  },
];

describe.each(agedBrieData)(`Aged Brie's quality improvement`, (data) => {
  test(`Aged Brie item quality of ${data.item.quality} should be upgraded to  ${data.qualityExpected}`, () => {
    const gildedRose = new Shop([data.item]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(data.qualityExpected);
  });
});

const maxQualityData = [
  {
    item: new Item("Over-quality item", 10, 80),
    qualityExpected: 49,
  },
];

describe.each(maxQualityData)(`Max Quality of 50`, (data) => {
  test(`Item quality of ${data.item.quality} should be  ${data.qualityExpected}`, () => {
    const gildedRose = new Shop([data.item]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(data.qualityExpected);
  });
});

const sulfurasData = [
  {
    item: new Item(legendaryItemNames.sulfuras, 10, 10),
    qualityExpected: 10,
    sellInExpected: 10,
  },
  {
    item: new Item(legendaryItemNames.sulfuras, 10, 80),
    qualityExpected: 80,
    sellInExpected: 10,
  },
  {
    item: new Item(legendaryItemNames.sulfuras, 10, 90),
    qualityExpected: 80,
    sellInExpected: 10,
  },
];
describe.each(sulfurasData)("Sulfuras", (data) => {
  test(`Item quality of ${data.item.quality} should be ${data.qualityExpected}`, function () {
    const gildedRose = new Shop([data.item]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(data.qualityExpected);
  });

  test(`SellIn of ${data.item.sellIn} should be ${data.sellInExpected}`, function () {
    const gildedRose = new Shop([data.item]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(data.sellInExpected);
  });
});

const backstageData = [
  {
    item: new Item(nonPerishableItemNames.backstage, 15, 30),
    qualityExpected: 31,
    sellInExpected: 14,
  },
  {
    item: new Item(nonPerishableItemNames.backstage, 10, 30),
    qualityExpected: 32,
    sellInExpected: 9,
  },
  {
    item: new Item(nonPerishableItemNames.backstage, 5, 30),
    qualityExpected: 33,
    sellInExpected: 4,
  },
  {
    item: new Item(nonPerishableItemNames.backstage, 3, 30),
    qualityExpected: 33,
    sellInExpected: 2,
  },
  {
    item: new Item(nonPerishableItemNames.backstage, 0, 30),
    qualityExpected: 0,
    sellInExpected: -1,
  },
];

describe.each(backstageData)(`Backstage Pass`, (data) => {
  test(`Backstage Pass of ${data.item.quality} should be  ${data.qualityExpected}`, () => {
    const gildedRose = new Shop([data.item]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(data.qualityExpected);
    expect(items[0].sellIn).toBe(data.sellInExpected);
  });
});
