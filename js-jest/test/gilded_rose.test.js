const { Shop, Item } = require('../src/gilded_rose');

describe('Gilded Rose', function () {
  describe('updateQuality testing for non conjured items without special names', () => {
    test('for items with 0 quality, updateQuality reduces sellIn by 1 and does not affect quality', () => {
      const sellIn = Math.floor((Math.random() - 0.5) * 100);
      const gildedRose = new Shop([new Item('foo', sellIn, 0)]);
      gildedRose.updateQuality();
      const updatedItem = gildedRose.items[0];
      expect([
        updatedItem.name,
        updatedItem.sellIn,
        updatedItem.quality,
      ]).toEqual(['foo', sellIn - 1, 0]);
    });

    test('for items with 0 < quality <= 50 and sellIn >= 0, both sellIn and quality are reduced by 1', () => {
      const sellIn = Math.floor(Math.random() * 100);
      const quality = Math.floor(1 + Math.random() * 50);
      const gildedRose = new Shop([new Item('foo', sellIn, quality)]);
      gildedRose.updateQuality();
      const updatedItem = gildedRose.items[0];
      expect([
        updatedItem.name,
        updatedItem.sellIn,
        updatedItem.quality,
      ]).toEqual(['foo', sellIn - 1, quality - 1]);
    });

    test('for items with 1 < quality <= 50 and sellIn < 0, sellIn in reduced by 1 and quality is reduced by 2', () => {
      const sellIn = -1 - Math.floor(Math.random() * 50);
      const quality = Math.floor(2 + Math.random() * 49);
      const gildedRose = new Shop([new Item('foo', sellIn, quality)]);
      gildedRose.updateQuality();
      const updatedItem = gildedRose.items[0];
      expect([
        updatedItem.name,
        updatedItem.sellIn,
        updatedItem.quality,
      ]).toEqual(['foo', sellIn - 1, quality - 2]);
    });

    test('for items with quality = 1 and sellIn < 0, sellIn in reduced by 1 and quality is reduced to 0', () => {
      const sellIn = -1 - Math.floor(Math.random() * 50);
      const gildedRose = new Shop([new Item('foo', sellIn, 1)]);
      gildedRose.updateQuality();
      const updatedItem = gildedRose.items[0];
      expect([
        updatedItem.name,
        updatedItem.sellIn,
        updatedItem.quality,
      ]).toEqual(['foo', sellIn - 1, 0]);
    });
  });

  describe('updateQuality testing for items with name "AgedBrie"', () => {
    test('where 0 <= quality < 50, quality is increased by one and sellIn is reduced by 1', () => {
      const sellIn = Math.floor((Math.random() - 0.5) * 100);
      const quality = Math.floor(Math.random() * 50);
      const gildedRose = new Shop([new Item('Aged Brie', sellIn, quality)]);
      gildedRose.updateQuality();
      const updatedItem = gildedRose.items[0];
      expect([
        updatedItem.name,
        updatedItem.sellIn,
        updatedItem.quality,
      ]).toEqual(['Aged Brie', sellIn - 1, quality + 1]);
    });

    test('where quality = 50, quality remains constant and sellIn is reduced by 1', () => {
      const sellIn = Math.floor((Math.random() - 0.5) * 100);
      const gildedRose = new Shop([new Item('Aged Brie', sellIn, 50)]);
      gildedRose.updateQuality();
      const updatedItem = gildedRose.items[0];
      expect([
        updatedItem.name,
        updatedItem.sellIn,
        updatedItem.quality,
      ]).toEqual(['Aged Brie', sellIn - 1, 50]);
    });
  });
});
