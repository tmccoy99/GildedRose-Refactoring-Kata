class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      if (item.name === 'Sulfuras, Hand of Ragnaros') {
        return;
      } else if (item.name === 'Aged Brie') {
        const increment = item.sellIn <= 0 ? 2 : 1;
        item.quality = Math.min(50, item.quality + increment);
        item.sellIn += -1;
        return;
      } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        const increment =
          item.sellIn >= 11
            ? 1
            : item.sellIn >= 6
            ? 2
            : item.sellIn >= 1
            ? 3
            : -item.quality;
        item.quality = Math.min(50, item.quality + increment);
        item.sellIn += -1;
        return;
      } else {
        const increment = item.sellIn <= 0 ? -2 : -1;
        item.quality = Math.max(0, item.quality + increment);
        item.sellIn += -1;
        return;
      }
    });

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
