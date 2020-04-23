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
        this.updateItemAttributes(item, itemSellIn, i)
        this.checkSellInIsNegative(item , i) 
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
    let backstagePasses = this.items[index].name === "Backstage passes to a TAFKAL80ETC concert"
    let sulfuras = this.items[index].name === "Sulfuras, Hand of Ragnaros"
    let agedBrie = this.items[index].name === "Aged Brie"
    let conjuredItem = this.items[index].name === "Conjured Item"
    if (backstagePasses || sulfuras || agedBrie || conjuredItem) {
      return true
    } else {
      return false
    }
  }

  decrementItemQuality(index, amount) {
    return this.items[index].quality -= amount;
  }

  incrementItemQuality(index, amount) {
    this.items[index].quality += amount;
  }

  decrementItemSellIn(index) {
    this.items[index].sellIn -= 1;
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

  updateItemAttributes(item, itemSellIn, i) {
    if (item === "Miscellaneous item") {
      this.decrementItemQuality(i, 1)
    } else if (item === "Conjured Item") {
      this.decrementItemQuality(i, 2)
    } else {
      this.incrementItemQuality(i, 1)
      if (item == 'Backstage passes to a TAFKAL80ETC concert') {
        if (itemSellIn < 11) {
          this.incrementItemQuality(i, 1);
        }
        if (itemSellIn < 6) {
          this.incrementItemQuality(i, 1)
        }
      }
    }
    this.decrementItemSellIn(i)
  }

  checkSellInIsNegative(item, i) {
    if (this.items[i].sellIn < 0) {
      if (item != 'Backstage passes to a TAFKAL80ETC concert') {
        this.decrementItemQuality(i, 1);
      } else {
        this.items[i].quality = 0
      }
    }  
  }
}

module.exports = {
  Item,
  Shop
}
