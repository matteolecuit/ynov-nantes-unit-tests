const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("fixme");
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



/**
 * The product quality never exceeds 50
 */



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