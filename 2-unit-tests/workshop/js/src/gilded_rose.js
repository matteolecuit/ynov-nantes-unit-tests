const {
  nonPerishableItemNames,
  legendaryItemNames,
  MAX_LEGENDARY_QUALITY,
  MAX_NON_LEGENDARY_QUALITY,
} = require("./constants");

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    if (Object.values(legendaryItemNames).includes(name)) this.quality = quality > MAX_LEGENDARY_QUALITY ? MAX_LEGENDARY_QUALITY : quality;
    else this.quality = quality > MAX_NON_LEGENDARY_QUALITY ? MAX_NON_LEGENDARY_QUALITY : quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].quality < 0) this.items[i].quality = 0;
      // Perishable
      if (!Object.values(nonPerishableItemNames).includes(this.items[i].name)) {
        if (this.items[i].quality > 0) {
          if (!Object.values(legendaryItemNames).includes(this.items[i].name)) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        // Non-perishable
        if (this.items[i].quality < MAX_NON_LEGENDARY_QUALITY) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == nonPerishableItemNames.backstage) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < MAX_NON_LEGENDARY_QUALITY) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < MAX_NON_LEGENDARY_QUALITY) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        } else {
          this.items[i].quality = MAX_NON_LEGENDARY_QUALITY;
        }
      }
      if (!Object.values(legendaryItemNames).includes(this.items[i].name)) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name == nonPerishableItemNames.agedBrie) {
          if (this.items[i].quality < MAX_NON_LEGENDARY_QUALITY) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        } else if (this.items[i].name == nonPerishableItemNames.backstage) {
          this.items[i].quality = this.items[i].quality - this.items[i].quality;
        } else if (this.items[i].quality > 0) {
          if (this.items[i].name != legendaryItemNames.sulfuras) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
