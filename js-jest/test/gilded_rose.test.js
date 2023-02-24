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

    test('for items with 0 < quality <= 50 and sellIn > 0, both sellIn and quality are reduced by 1', () => {
      const sellIn = Math.floor(1 + Math.random() * 100);
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

    test('for items with 1 < quality <= 50 and sellIn <= 0, sellIn in reduced by 1 and quality is reduced by 2', () => {
      const sellIn = -Math.floor(Math.random() * 50);
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

    test('for items with quality = 1 and sellIn <= 0, sellIn in reduced by 1 and quality is reduced to 0', () => {
      const sellIn = -Math.floor(Math.random() * 50);
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

  describe('updateQuality testing for items with name "Aged Brie"', () => {
    test('where 0 <= quality < 50 and sellIn >= 1, quality is increased by one and sellIn is reduced by 1', () => {
      const sellIn = Math.floor(1 + Math.random() * 50);
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

    test('where 0 <= quality < 49 and sellIn <= 0, quality is increased by two and sellIn is reduced by 1', () => {
      const sellIn = -Math.floor(Math.random() * 50);
      const quality = Math.floor(Math.random() * 49);
      const gildedRose = new Shop([new Item('Aged Brie', sellIn, quality)]);
      gildedRose.updateQuality();
      const updatedItem = gildedRose.items[0];
      expect([
        updatedItem.name,
        updatedItem.sellIn,
        updatedItem.quality,
      ]).toEqual(['Aged Brie', sellIn - 1, quality + 2]);
    });
    test('where quality = 49 and sellIn <= 0, quality is increased to 50 and sellIn is reduced by 1', () => {
      const sellIn = -Math.floor(Math.random() * 50);
      const gildedRose = new Shop([new Item('Aged Brie', sellIn, 49)]);
      gildedRose.updateQuality();
      const updatedItem = gildedRose.items[0];
      expect([
        updatedItem.name,
        updatedItem.sellIn,
        updatedItem.quality,
      ]).toEqual(['Aged Brie', sellIn - 1, 50]);
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

  describe('updateQuality testing for items named "Sulfuras, Hand of Ragnaros"', () => {
    test('sellIn value and quality remain constant, quality is always equal to 80', () => {
      const sellIn = Math.floor((Math.random() - 0.5) * 100);
      const gildedRose = new Shop([
        new Item('Sulfuras, Hand of Ragnaros', sellIn, 80),
      ]);
      gildedRose.updateQuality();
      const updatedItem = gildedRose.items[0];
      expect([
        updatedItem.name,
        updatedItem.sellIn,
        updatedItem.quality,
      ]).toEqual(['Sulfuras, Hand of Ragnaros', sellIn, 80]);
    });
  });

  describe('updateQuality testing for items named "Backstage passes to a TAFKAL80ETC concert"', () => {
    test('if sellIn decreases below zero, the quality of the item is set to 0 and sellIn reduces by 1', () => {
      const positiveQuality = Math.floor(1 + Math.random() * 50);
      const passForToday = new Item(
        'Backstage passes to a TAFKAL80ETC concert',
        0,
        positiveQuality
      );
      const negativeSellIn = -1 - Math.floor(Math.random() * 50);
      const oldPass = new Item(
        'Backstage passes to a TAFKAL80ETC concert',
        negativeSellIn,
        0
      );
      const gildedRose = new Shop([passForToday, oldPass]);
      gildedRose.updateQuality();
      expect([
        passForToday.name,
        passForToday.sellIn,
        passForToday.quality,
      ]).toEqual(['Backstage passes to a TAFKAL80ETC concert', -1, 0]);
      expect([oldPass.name, oldPass.sellIn, oldPass.quality]).toEqual([
        'Backstage passes to a TAFKAL80ETC concert',
        negativeSellIn - 1,
        0,
      ]);
    });

    test('for 1 <= sellIn <= 5 and 0 <= quality <= 47, quality increases by 3 and sellIn reduces by 1', () => {
      const sellIn = 1 + Math.floor(Math.random() * 5);
      const quality = Math.floor(Math.random() * 48);
      const gildedRose = new Shop([
        new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality),
      ]);
      gildedRose.updateQuality();
      const updatedItem = gildedRose.items[0];
      expect([
        updatedItem.name,
        updatedItem.sellIn,
        updatedItem.quality,
      ]).toEqual([
        'Backstage passes to a TAFKAL80ETC concert',
        sellIn - 1,
        quality + 3,
      ]);
    });

    test('for 1 <= sellIn <= 5 and 48 <= quality <= 50, quality is set to 50 and sellIn reduces by 1', () => {
      const sellIn = 1 + Math.floor(Math.random() * 5);
      const quality = 48 + Math.floor(Math.random() * 3);
      const gildedRose = new Shop([
        new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality),
      ]);
      gildedRose.updateQuality();
      const updatedItem = gildedRose.items[0];
      expect([
        updatedItem.name,
        updatedItem.sellIn,
        updatedItem.quality,
      ]).toEqual(['Backstage passes to a TAFKAL80ETC concert', sellIn - 1, 50]);
    });

    test('for 6 <= sellIn <= 10 and 0 <= quality <= 48, quality increases by 2 and sellIn reduces by 1', () => {
      const sellIn = 6 + Math.floor(Math.random() * 5);
      const quality = Math.floor(Math.random() * 49);
      const gildedRose = new Shop([
        new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality),
      ]);
      gildedRose.updateQuality();
      const updatedItem = gildedRose.items[0];
      expect([
        updatedItem.name,
        updatedItem.sellIn,
        updatedItem.quality,
      ]).toEqual([
        'Backstage passes to a TAFKAL80ETC concert',
        sellIn - 1,
        quality + 2,
      ]);
    });

    test('for 6 <= sellIn <= 10 and 49 <= quality <= 50, quality is set to 50 and sellIn reduces by 1', () => {
      const sellIn = 6 + Math.floor(Math.random() * 5);
      const quality = 49 + Math.floor(Math.random() * 2);
      const gildedRose = new Shop([
        new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality),
      ]);
      gildedRose.updateQuality();
      const updatedItem = gildedRose.items[0];
      expect([
        updatedItem.name,
        updatedItem.sellIn,
        updatedItem.quality,
      ]).toEqual(['Backstage passes to a TAFKAL80ETC concert', sellIn - 1, 50]);
    });

    test('for 11 <= sellIn and quality <= 49, quality is increases by 1 and sellIn reduces by 1', () => {
      const sellIn = 11 + Math.floor(Math.random() * 40);
      const quality = Math.floor(Math.random() * 50);
      const gildedRose = new Shop([
        new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality),
      ]);
      gildedRose.updateQuality();
      const updatedItem = gildedRose.items[0];
      expect([
        updatedItem.name,
        updatedItem.sellIn,
        updatedItem.quality,
      ]).toEqual([
        'Backstage passes to a TAFKAL80ETC concert',
        sellIn - 1,
        quality + 1,
      ]);
    });

    test('for 11 <= sellIn and quality = 50, quality remains constant and sellIn reduces by 1', () => {
      const sellIn = 11 + Math.floor(Math.random() * 40);
      const quality = Math.floor(Math.random() * 50);
      const gildedRose = new Shop([
        new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality),
      ]);
      gildedRose.updateQuality();
      const updatedItem = gildedRose.items[0];
      expect([
        updatedItem.name,
        updatedItem.sellIn,
        updatedItem.quality,
      ]).toEqual([
        'Backstage passes to a TAFKAL80ETC concert',
        sellIn - 1,
        quality + 1,
      ]);
    });
  });

  describe('Conjured item testing', () => {
    test('for items with sellIn >= 1 and quality >= 2, quality reduces by 2 and sellIn reduces by 1', () => {
      const sellIn = Math.floor(1 + Math.random() * 100);
      const quality = Math.floor(2 + Math.random() * 50);
      const gildedRose = new Shop([new Item('Conjured foo', sellIn, quality)]);
      gildedRose.updateQuality();
      const updatedItem = gildedRose.items[0];
      expect([
        updatedItem.name,
        updatedItem.sellIn,
        updatedItem.quality,
      ]).toEqual(['Conjured foo', sellIn - 1, quality - 2]);
    });
  });
});
