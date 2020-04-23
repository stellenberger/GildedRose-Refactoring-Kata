**Gilded Rose Tech Test**

This is my take on the Gilded Rose Tech Test. As this tech test is a refactoring kata, I decided to write tests to ensure that the code works as it should, and also to make the refactoring process much easier as ill see exactly when it will break. As there are several different items that behave differently, i decided to group them in their own 'describes' to make reading the tests a little easier (for example, I wrote tests just for Aged Brie first). To see the full specification requirements of each item, look at the bottom of this README. Even though unnecessary in this Kata, as we cannot touch the Item class, I have doubled the Items in the tests to ensure complete independency of the Shop class.

Once I had written my tests and the code was working (except for implememnting the conjured items - this comes later) I decided to improve the code readability before refactoring it. This means moving repeated and hard to read logic (such as ```this.items[0].name```) into variables, so it reads more like english when we iterate through the array of items. These variables can be found in the Update Quality, which will call a function that finds out the item quality, sellIn and name. 

I then began to refactor based on repeated conditionals. One conditional I noticed is that we should never alter the Sulfuras item, as it is legendary, though there were many times when conditionals checked that the item was not sulfuras. I changed this so it was checked once, at the beginning of the code (look at modifiableItem), and never again. Next was the quality range - it should never be above 50 or below 0, and yet there were conditionals checking this throughout the code. 

I redacted the code further, moving the logic out of the updateQuality function and into functions whose names clearly represented their intention, such as checkItem, checkItemQuality, checkItemSellIn, checkStock, checkModifiableItems and more. This improved the flow control of the whole kata. 

When I came to implementing the Conjured Items last, it was clear what I needed to change in order to stock this item; just the checkstock function and updateItemAttributes function. Simple! 

*"Hi and welcome to team Gilded Rose. As you know, we are a small inn with a prime location in a prominent city run by a friendly innkeeper named Allison. We also buy and sell only the finest goods. Unfortunately, our goods are constantly degrading in quality as they approach their sell by date. We have a system in place that updates our inventory for us. It was developed by a no-nonsense type named Leeroy, who has moved on to new adventures. Your task is to add the new feature to our system so that we can begin selling a new category of items. First an introduction to our system:

All items have a SellIn value which denotes the number of days we have to sell the item. All items have a Quality value which denotes how valuable the item is. At the end of each day our system lowers both values for every item. Pretty simple, right? Well this is where it gets interesting:

- Once the sell by date has passed, Quality degrades twice as fast
- The Quality of an item is never negative
- “Aged Brie” actually increases in Quality the older it gets
- The Quality of an item is never more than 50
- “Sulfuras”, being a legendary item, never has to be sold or decreases in Quality
- “Backstage passes”, like aged brie, increases in Quality as it’s SellIn value approaches; Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Quality drops to 0 after the concert

We have recently signed a supplier of conjured items. This requires an update to our system:

* “Conjured” items degrade in Quality twice as fast as normal items

Feel free to make any changes to the UpdateQuality method and add any new code as long as everything still works correctly. However, do not alter the Item class or Items property as those belong to the goblin in the corner who will insta-rage and one-shot you as he doesn’t believe in shared code ownership (you can make the UpdateQuality method and Items property static if you like, we’ll cover for you)."*
