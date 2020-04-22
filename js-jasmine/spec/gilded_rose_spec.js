var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  let agedBrie 
  let handofRagnaros 
  let backstagePasses
  let randomItem 

  beforeEach(function() {
    agedBrie = new Item("Aged Brie", 10, 10);
    handofRagnaros = new Item("Sulfuras, Hand of Ragnaros", 10, 10)
    backstagePasses = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)
    randomItem = new Item("Random Item", 15, 20);
  })
  
  describe("Aged Brie", function() {
    
    it("should increase the quality of Aged Brie by 1, and decrease the SellIn by 1", function() {
      const gildedRose = new Shop([agedBrie])
      const items = gildedRose.updateQuality()
      expect(items[0].name).toEqual("Aged Brie")
      expect(items[0].sellIn).toEqual(9)
      expect(items[0].quality).toEqual(11)
    })

    it("should increase the quality of Aged Brie by 2, and decreate the SellIn by 2", function() {
      const gildedRose = new Shop([agedBrie])
      gildedRose.updateQuality()
      const items = gildedRose.updateQuality()
      expect(items[0].name).toEqual("Aged Brie")
      expect(items[0].sellIn).toEqual(8)
      expect(items[0].quality).toEqual(12)
    })
    
  })

  it("should hold one item in the shop", function() {
    const gildedRose = new Shop([ new Item("item", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("item")
  });

  it("sellIn decreases by 1, besides handOfRagnaros", function() {
    const gildedRose = new Shop([agedBrie, handofRagnaros, backstagePasses, randomItem])
    const items = gildedRose.updateQuality()
    expect(items[0].name).toEqual("Aged Brie")
    expect(items[0].sellIn).toEqual(9)
    expect(items[1].name).toEqual("Sulfuras, Hand of Ragnaros")
    expect(items[1].sellIn).toEqual(10)
    expect(items[2].name).toEqual("Backstage passes to a TAFKAL80ETC concert")
    expect(items[2].sellIn).toEqual(9)
    expect(items[3].name).toEqual("Random Item")
    expect(items[3].sellIn).toEqual(14)
  })

  

});
