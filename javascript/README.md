# Javascript Q&As

## What's the difference between `.call` and `.apply`?
The difference is that `apply` lets you invoke the function with arguments as an array;
`call` requires the parameters to be listed explicitly. A useful mnemonic is "A for array and C for comma."

## When would you use `document.write()`?
Generally `document.write` is considered a bad practice.
But it is the simpliest way to include third party content into the document.
Also the shortest, and it does not cause any conflicts.
You may also use `document.write` to:
* include styles that should only work if JavaScript is enabled.
* alter all the content of the iframe (this approach have been used to partially update the page before AJAX)

## What is the difference between `==` and `===`?
JavaScript has both strict `===` and type-converting `==` equality comparison.
For strict equality the objects being compared must have the same type and:

* Two strings are strictly equal when they have the same sequence of characters,
  same length, and same characters in corresponding positions.
* Two numbers are strictly equal when they are numerically equal (have the same number value).
  NaN is not equal to anything, including NaN. Positive and negative zeros are equal to one another.
* Two Boolean operands are strictly equal if both are true or both are false.
* Two objects are strictly equal if they refer to the same Object.
* `null` and `undefined` types are `==` (but not `===`). I.e. `null == undefined` is `true` but `Null===Undefined` is `false`

## How prototypal inheritance works

JavaScript objects are dynamic "bags" of properties (referred to as own properties). Each object has an internal link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with `null` as its prototype. `null`, by definition, has no prototype, and acts as the final link in this prototype chain. When trying to access a property of an object, the property will not only be sought on the object but on the prototype of the object, the prototype of the prototype, and so on until either a property with a matching name is found or the end of the prototype chain is reached.

Traditional `new` inheritance:

The new operator takes a function F and arguments: new F(arguments...). It does three easy steps:
- Create the instance of the class. It is an empty object with its __proto__ property set to F.prototype.
- Initialize the instance. The function F is called with the arguments passed and this set to be the instance.
- Return the instance

```js
function New (f) {
  var n = { '__proto__': f.prototype }

  return function () {
    f.apply(n, arguments)
    return n
  }
}

function Point(x, y) {
  this.x = x
  this.y = y
}

Point.prototype = {
  print: function () {
    console.log(this.x, this.y)
  }
}

var p = new Point(10, 20)
p.print() // 10 20
```

ECMAScript 5 introduced a new method: Object.create(). Calling this method creates a new object. The prototype of this object is the first argument of the function:

```js
Object.create = function (parent) {
  function F() {}
  F.prototype = parent
  return new F()
}

// Same polyfill using deprecated `__proto__` property
Object.create = function (parent) {
  return { '__proto__': parent  }
}

var Point = {
  x: 0,
  y: 0,
  print: function () {
    console.log(this.x, this.y)
  }
}

var p = Object.create(Point)
p.x = 10
p.y = 20
p.print() // 10 20
```
The lookup time for properties that are high up on the prototype chain can have a negative impact on performance, and this may be significant in code where performance is critical. Additionally, trying to access nonexistent properties will always traverse the full prototype chain.

## What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?

This is an increasingly common practice, employed by many popular JavaScript libraries (jQuery, Node.js, etc.). This technique creates a closure around the entire contents of the file which, perhaps most importantly, creates a private namespace and thereby helps avoid potential name clashes between different JavaScript modules and libraries.

Another feature of this technique is to allow for an easily referenceable (presumably shorter) alias for a global variable. This is often used, for example, in jQuery plugins. jQuery allows you to disable the $ reference to the jQuery namespace, using jQuery.noConflict(). If this has been done, your code can still use $ employing this closure technique, as follows:

```js
(function($) { /* jQuery plugin code referencing $ */  } )(jQuery)
```

## Explain why the following doesn't work as an IIFE: `function foo(){  }();`

This is a function definition, it defines foo. But it’s not a function expression - that is, it’s not understood by the JS parser to actually call a function.

For the parser, things look like this:

```js
function foo(){
} // ok, done with that function definition
  // (silly human left off the semicolon, how embarrassing!)

(); // Are they trying to call something? What’s the function’s name?
    // PARSE ERROR
```

In order to prep the parser that we're actually dealing with a function expression we have to wrap things up in () like so:

```js
( // oh goody, we're going to call some function expressions!
  function foo(){ // here's the function definition
  }() // and here's where the function is actually called
);
```
