## What data types are supported in Javascript?

According to the latest ECMAScript release, these are the data types:

Boolean
Null
Undefined
Number
String
Symbol
Object
Ok, let’s run over those one by one:

Boolean
Pretty standard across all languages, booleans are true and false. They're often used for conditional statements.

var raining = false;
if(raining) {
  bringUmbrella();
}
Null and Undefined
I've written about these before, so give that a read :)

Number
Things start to get more interesting here. The number data type covers integers and floats. That is, the number type can handle normal numbers (1, 2, 3, 4), but also negative numbers and decimal places. This is different from many languages that have multiple data types to support different numbers.

var num = 1;
typeof num; // number

var num = -2;
typeof num; // number

var num = 0.3;
typeof num; // number
String
As in most languages, JS strings are groupings of characters.

"hello world";
"I like cats";
'Testing "quotes';
I don’t think they're particularly interesting, but they are remarkably powerful. The main way we communicate with our users is the written word and string makes this possible.

Symbol
This is new in ECMAScript 6; check the browser support before you use it.

Symbols allow for private(ish) properties on objects. Before ECMAScript 6 all properties for an object could be accessed through for in, like this:

var dog = { bark: true }

for (var property in dog) {
  if (dog.hasOwnProperty(property)) {
    console.log(property); // logs "bark"
  }
}
Since symbols are not enumerable they cannot be accessed in this way. However, the symbolised properties are not truly private since they can be accessed directly.

var breed = Symbol("breed");
var dog = { bark: true };
dog[breed] = "Corgi";

for (var property in dog) {
  if (dog.hasOwnProperty(property)) {
    console.log(property); // logs "bark", but not "breed"
  }
}
console.log(dog[breed]); // logs "Corgi"
Object
Everything in JS that we didn’t discuss above is an Object. So objects are the most complex data type; I'll dedicate a future post to them since it’s a lot to cover here. But you've probably worked with objects in the past. They typically look like this:

var cat = { sound: "meow" };

var fluffy = new Cat();

var whiskers = new function() {
    this.sound = "meow";
}
But notice that we haven’t mentioned Array, Date, or even function that’s because, officially, they're all of type object
