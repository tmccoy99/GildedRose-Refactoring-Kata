# Gilded Rose Refactoring Kata

This Kata was originally created by Terry Hughes (http://twitter.com/TerryHughes). It is already on GitHub [here](https://github.com/NotMyself/GildedRose). See also [Bobby Johnson's description of the kata](https://iamnotmyself.com/refactor-this-the-gilded-rose-kata/).

This solution to the Gilded Rose was written in the `js-jest` folder.

## Approach to the Problem
Unlike other Kata or techtests, this challenge essentially presents you with a code structure of functional, yet unbelievably poor quality, code. The code is also completely untested, which means that leaping straight into refactoring is almost certain to cause issues. To approach this task, then, I followed a three step plan:

1. Thoroughly test all aspects of the existing functionality (all tests should pass without any alteration to the code).
2. Refactor the existing code without breaking any tests.
3. Test-drive the new "Conjured items" feature.

This approach allowed me to carry out the extensive refactoring in small, regularly committed steps in which I could have confidence. After refactoring, the `for` loop contents was essentially reduced to a `switch` block that computed the non-standard increments due to special `Item` names, followed by a simple incrementation of the `Item`'s `quality` and `sellIn` properties. This format made implementing the conjured items feature a trivial task - achievable with a one-line `if` statement - clearly indicating that the refactoring was successful in making the code easily alterable.

## Design choices
The requirements for this Kata do not make it clear whether `Item`s can be conjured in combination with other special name dependent modifiers. For example, should an `Item` named `Conjured Aged Brie` update its quality like `Aged Brie`, but doubled? I assumed this was not the case, partly because the prospect of `Sulfuras, Hand of Ragnaros` being simply conjured by a mage would deeply upset even the most casual of World of Warcraft fans. 

Limiting conjured status to regular `Item`s then, I decided it would be most practical to designate conjured status through the `name` of an `Item`. I would have preferred to use an instance variable to keep track of this, but alterations to the `Item` class were forbidden by the rules of the Kata.

## Running the code
As required, there has been no alterations to how the `Shop` class functions. As shown below, the `Shop` and `Item` classes can be imported and instantiated into an REPL such as `node`, where `Item`s are passed into the `Shop` constructor. The `quality` and `sellIn` properties of each `Item` passed to the constructor can be updated by calling the `updateQuality` method on the `Shop` instance.
<img width="538" alt="Screenshot 2023-02-24 at 16 26 34" src="https://user-images.githubusercontent.com/67124105/221232765-69d775b0-868e-4c37-86f0-d7455f3b2361.png">

