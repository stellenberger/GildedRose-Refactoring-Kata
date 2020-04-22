class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.checkItem(i)
      let itemQuality = this.checkItemQuality(i)
      let itemSellIn = this.checkItemSellIn(i)
      let qualityRange = this.checkItemQualityRange(itemQuality)
      let modifiableItem = this.checkModifiableItems(item)
      if (qualityRange && modifiableItem) {
        


        if (item === "Miscellaneous item") {
            this.decrementItemQuality(i)
        } else {
          if (item != 'Sulfuras, Hand of Ragnaros') {
            this.incrementItemQuality(i)
            if (item == 'Backstage passes to a TAFKAL80ETC concert') {
              if (itemSellIn < 11) {
                this.incrementItemQuality(i);
              }
              if (itemSellIn < 6) {
                this.incrementItemQuality(i)
              }
            }
          }
        }
        this.decrementItemSellIn(i)
        
        if (this.items[i].sellIn < 0) {
          if (item != 'Aged Brie') {
            if (item != 'Backstage passes to a TAFKAL80ETC concert') {
              this.decrementItemQuality(i);
            } else {
              this.items[i].quality = this.items[i].quality - this.items[i].quality;
            }
          } else {
            this.incrementItemQuality(i);
          }
        }
        
      }
    }

    return this.items;
  }

  checkItem(index) {
    if (this.checkStock(index)) {
      return this.items[index].name
    } else {
      return "Miscellaneous item"
    }
  }

  checkItemQuality(index) {
    return this.items[index].quality
  }

  checkItemSellIn(index) {
    return this.items[index].sellIn
  }

  checkStock(index) {
    if (this.items[index].name === "Backstage passes to a TAFKAL80ETC concert") {
      return true
    } else if (this.items[index].name === "Sulfuras, Hand of Ragnaros") {
      return true
    } else if (this.items[index].name === "Aged Brie") {
      return true
    } else {
      return false
    }
  }

  decrementItemQuality(index) {
    return this.items[index].quality = this.items[index].quality - 1;
  }

  incrementItemQuality(index) {
    this.items[index].quality = this.items[index].quality + 1;
  }

  decrementItemSellIn(index) {
    this.items[index].sellIn = this.items[index].sellIn - 1;
  }

  checkItemQualityRange(itemQuality) {
    return itemQuality > 0 && itemQuality < 50
  }

  checkModifiableItems(item) {
    if (item === 'Sulfuras, Hand of Ragnaros') {
      return false
    } else {
      return true
    }
  }
}

module.exports = {
  Item,
  Shop
}
