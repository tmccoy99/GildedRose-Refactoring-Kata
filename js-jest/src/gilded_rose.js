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
      let increment;
      switch (item.name) {
        case 'Sulfuras, Hand of Ragnaros':
          return;
        case 'Aged Brie':
          increment = item.sellIn <= 0 ? 2 : 1;
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          increment =
            item.sellIn >= 11
              ? 1
              : item.sellIn >= 6
              ? 2
              : item.sellIn >= 1
              ? 3
              : -item.quality;
          break;
        default:
          increment = item.sellIn <= 0 ? -2 : -1;
          if (item.name.startsWith('Conjured')) {
            increment = -2;
          }
      }
      this.#incrementQuality(item, increment);
      item.sellIn += -1;
    });

    return this.items;
  }

  #incrementQuality(item, increment) {
    item.quality =
      increment > 0
        ? Math.min(50, item.quality + increment)
        : Math.max(0, item.quality + increment);
  }
}

module.exports = {
  Item,
  Shop,
};
