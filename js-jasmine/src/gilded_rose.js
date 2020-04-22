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
      if (itemQuality > 0) {
        if (item === "Miscellaneous item") {
            this.decrementItemQuality(i)
        } else {
          if (itemQuality < 50 && item != 'Sulfuras, Hand of Ragnaros') {
            this.incrementItemQuality(i)
            if (item == 'Backstage passes to a TAFKAL80ETC concert') {
              if (this.items[i].sellIn < 11) {
                if (itemQuality < 50) {
                  this.incrementItemQuality(i);
                }
              }
              if (this.items[i].sellIn < 6) {
                if (itemQuality < 50) {
                  this.incrementItemQuality(i)
                }
              }
            }
          }
        }
        if (item != 'Sulfuras, Hand of Ragnaros') {
          this.items[i].sellIn = this.items[i].sellIn - 1;
        }
        if (this.items[i].sellIn < 0) {
          if (item != 'Aged Brie') {
            if (item != 'Backstage passes to a TAFKAL80ETC concert') {
              if (itemQuality > 0) {
                if (item != 'Sulfuras, Hand of Ragnaros') {
                  this.decrementItemQuality(i);
                }
              }
            } else {
              this.items[i].quality = this.items[i].quality - this.items[i].quality;
            }
          } else {
            if (this.items[i].quality < 50) {
              this.incrementItemQuality(i);
            }
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
}

module.exports = {
  Item,
  Shop
}
