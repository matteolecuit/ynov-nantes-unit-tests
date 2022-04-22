const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});

/** 
 * All elements have 'sellIn' property which defines how many days are remaining to sell the product
 */


/** 
 * All products have 'quality' property which defines how the product is precious
 */


/** 
 * At the end of each day, our system decreases those two properties on each product
 */


/** 
 * Once the consumption date is expired, the quality is deteriorating 2 times faster 
 */


/**
 * The product quality can't be negative
 */


/**
 * "Aged Brie" inscrease its quality as time passes
 */
 const agedBrie = [
  {
    item: new Item("Aged Brie", 10, 4),
    qualityExpected: 5,
  },
  {
    item: new Item("Aged Brie", 10, 23),
    qualityExpected: 24,
  },
  {
    item: new Item("Aged Brie", 10, 0),
    qualityExpected: 1,
  },
  {
    item: new Item("Aged Brie", 10, 46),
    qualityExpected: 47,
  },
];

describe.each(agedBrie)(`Aged Brie's quality improvement over time`, (data) => {
  test(`Aged Brie item quality of ${data.item.quality} should be upgraded to ${data.qualityExpected}`, () => {
    const gildedRose = new Shop([data.item]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(data.qualityExpected);  
  });
});

/**
 * The product quality never exceeds 50
 */
 const maxProductsQuality = [
  {
    item: new Item("Aged Brie", 10, 50),
    expectedQuality: 50,
  },
  {
    item: new Item("St Nectaire", 10, 80),
    expectedQuality: 49,
  }
];

describe.each(maxProductsQuality)("Max quality", (data) => {
  test(`Item quality of ${data.item.quality} should be ${data.expectedQuality}`, () => {
    const gildedRose = new Shop([data.item]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(data.expectedQuality);  
  });
});

/**
 * "Sulfuras", a legendary item, don't have expiration date and never lose quality
 */


/**
 * "Backstage passes", like "Aged Brie", increase its quality (quality) as time passes (sellIn) ; 
 * the quality inscrease by 2 when it remains 10 days or less and by 3 when it remains 5 days or less, but the quality drops to 0 after the concert
 */


/**
 * "Conjured" items have their quality deteriorate 2 times faster than normal items.
 */