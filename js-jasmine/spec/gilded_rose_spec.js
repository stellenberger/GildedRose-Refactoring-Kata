var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  let agedBrie 
  let agedBrieQualityFifty
  let handofRagnaros 
  let backstagePassesSellInFive
  let backstagePassesSellInTen
  let backstagePassesSellInTwenty
  let miscItem 
  let miscItemQualityTwenty

  beforeEach(function() {
    agedBrie = new Item("Aged Brie", 10, 10);
    agedBrieQualityFifty = new Item("Aged Brie", 10, 50);
    handofRagnaros = new Item("Sulfuras, Hand of Ragnaros", 10, 10)
    backstagePassesSellInFive = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)
    backstagePassesSellInTen = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)
    backstagePassesSellInTwenty = new Item("Backstage passes to a TAFKAL80ETC concert", 20, 10)
    miscItem = new Item("misc Item", 10, 10);
    miscItemQualityTwenty = new Item("misc Item", 0, 20)
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

    it("should increase the quality of aged brie even way after its SellIn date passes", function() {
      const gildedRose = new Shop([agedBrie])
      for(let i = 0; i < 10; i++) { gildedRose.updateQuality() }
      const items = gildedRose.updateQuality()
      expect(items[0].sellIn).toEqual(-1)
      expect(items[0].quality).toEqual(20)
    })
    
  })

  describe("Sulfuras", function() {
    
    it("being a legendary item, never has to be sold or decreases in quality", function() {
      const gildedRose = new Shop([handofRagnaros])
      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toEqual(10)
      expect(gildedRose.items[0].sellIn).toEqual(10)
      // the quality of Sulfuras should actually be 80, and should never alter, according 
      // to the actual documentation for this kata
    })

  })

  describe("backstage passes", function() {

    it("quality increment by 1 when sellIn > 10", function() {
      const gildedRose = new Shop([backstagePassesSellInTwenty])
      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toEqual(11)
    })

    it("quality increment by 2 when sellIn < 10 but sellIn > 5", function() {
      const gildedRose = new Shop([backstagePassesSellInTen])
      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toEqual(12)
    })

    it("quality increment by 3 when sellIn < 5", function() {
      const gildedRose = new Shop([backstagePassesSellInFive])
      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toEqual(13)
    })

    it("quality jumps to zero once concert has taken place", function() {
      const gildedRose = new Shop([backstagePassesSellInFive])
      for(let i = 0; i <= 5; i++) { gildedRose.updateQuality() }
      expect(gildedRose.items[0].quality).toEqual(0)
    })
  })

  describe("miscellaneous items", function() {
    it("should regularly decrease in quality and sellIn", function() {
      const gildedRose = new Shop([miscItem])
      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toEqual(9)
      expect(gildedRose.items[0].sellIn).toEqual(9)
      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toEqual(8)
      expect(gildedRose.items[0].sellIn).toEqual(8)
    })
  })

  describe("quality", function() {
    it("should never be more than 50", function() {
      const gildedRose = new Shop([agedBrieQualityFifty])
      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).not.toEqual(51)
      expect(gildedRose.items[0].quality).toEqual(50)
    })

    it("cannot ever be negative", function() {
      const gildedRose = new Shop([miscItem])
      for(let i = 0; i <= 11; i++) { gildedRose.updateQuality() }
      expect(gildedRose.items[0].quality).toEqual(0)
    })

    it("degrades twice as fast once sellIn date is less than 0", function() {
      const gildedRose = new Shop([miscItemQualityTwenty])
      for(let i = 0; i < 2; i++) { gildedRose.updateQuality() }
      expect(gildedRose.items[0].quality).toEqual(16)
      expect(gildedRose.items[0].sellIn).toEqual(-2)
    })
  })

  describe("all items", function(){ 
    it("should hold one item in the shop", function() {
      const gildedRose = new Shop([ new Item("item", 0, 0) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual("item")
    });

    it("sellIn decreases by 1, besides handOfRagnaros", function() {
      const gildedRose = new Shop([agedBrie, handofRagnaros, backstagePassesSellInTwenty, miscItem])
      const items = gildedRose.updateQuality()
      expect(items[0].name).toEqual("Aged Brie")
      expect(items[0].sellIn).toEqual(9)
      expect(items[1].name).toEqual("Sulfuras, Hand of Ragnaros")
      expect(items[1].sellIn).toEqual(10)
      expect(items[2].name).toEqual("Backstage passes to a TAFKAL80ETC concert")
      expect(items[2].sellIn).toEqual(19)
      expect(items[3].name).toEqual("misc Item")
      expect(items[3].sellIn).toEqual(9)
    })
  })

  describe("check item", function() {

  })
});
