# Javascript Q&As

#### JS Questions:

* [Explain event delegation](eventDelegation.md)
* [Explain how `this` works in JavaScript](this.md)
* [Explain how prototypal inheritance works](prototypes.md) * — Not full *
* What do you think of AMD vs CommonJS?
* [Explain why the following doesn't work as an IIFE: `function foo(){ }();`.](iife.md)
  * [What needs to be changed to properly make it an IIFE?](iife.md)
* [What's the difference between a variable that is: `null`, `undefined` or undeclared?](nullVsUndefined.md)
  * How would you go about checking for any of these states?
* [What is a closure, and how/why would you use one?](closure.md)
* What's a typical use case for anonymous functions?
* How do you organize your code? (module pattern, classical inheritance?)
* [What's the difference between host objects and native objects?](hostAndNativeObjects.md)
* [Difference between: `function Person(){}`, `var person = Person()`, and `var person = new Person()`?](newVsFunction.md)
* [What's the difference between `.call` and `.apply`?](callVsApply.md)
* [Explain `Function.prototype.bind`.](bind.md)
* [When would you use `document.write()`?](documentWrite.md)
* [What's the difference between feature detection, feature inference, and using the UA string?](featureDetection.md)
* [Explain Ajax in as much detail as possible.](ajax.md)
* What are the advantages and disadvantages of using Ajax?
* [Explain how JSONP works (and how it's not really Ajax).](jsonp.md)
* Have you ever used JavaScript templating?
  * If so, what libraries have you used?
* [Explain "hoisting".](hoisting.md)
* [Describe event bubbling.](eventFlow.md)
* [What's the difference between an "attribute" and a "property"?](attributeVsProperty.md)
* [Why is extending built-in JavaScript objects not a good idea?](extendingBuiltInObjects.md)
* [Difference between document load event and document DOMContentLoaded event?](documentVsDOMLoadEvent.md)
* [What is the difference between `==` and `===`?](equalOperator.md)
* [Explain the same-origin policy with regards to JavaScript.](sameOrigin.md)
* [Make this work:](duplicate.md)
```javascript
duplicate([1,2,3,4,5]); // [1,2,3,4,5,1,2,3,4,5]
```
* Why is it called a Ternary expression, what does the word "Ternary" indicate?
* [What is `"use strict";`? what are the advantages and disadvantages to using it?](useStrict.md)
* Create a for loop that iterates up to `100` while outputting **"fizz"** at multiples of `3`, **"buzz"** at multiples of `5` and **"fizzbuzz"** at multiples of `3` and `5`
* Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?
* Why would you use something like the `load` event? Does this event have disadvantages? Do you know any alternatives, and why would you use those?
* [Explain what a single page app is and how to make one SEO-friendly.](SPAvsSEO.md)
* What is the extent of your experience with Promises and/or their polyfills?
* [What are the pros and cons of using Promises instead of callbacks?](callbacksVsPromises.md)
* What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?
* What tools and techniques do you use debugging JavaScript code?
* What language constructions do you use for iterating over object properties and array items?
* Explain the difference between mutable and immutable objects.
  * What is an example of an immutable object in JavaScript?
  * What are the pros and cons of immutability?
  * How can you achieve immutability in your own code?
* [Explain the difference between synchronous and asynchronous functions.](syncVsAsyncFunctions.md)
* [What is event loop?](eventLoop.md)
  * [What is the difference between call stack and task queue?](eventLoop.md)
* Explain the differences on the usage of `foo` between `function foo() {}` and `var foo = function() {}`
--
* [What do you know about promises?](promise.md)
* [How do you check if an object is an array or not?](checkArray.md)
* [Data types in javascript](dataTypes.md)
* [Anonymous vs. referenced vs. declared functions](functionDeclarations.md)
* [What are the ways server can push data to the client?](comet.md)
  * [Describe long polling](longPolling.md)
  * Describe http streaming
  * [What are server-sent events?](serverSentEvents.md)
* [How would you get currently focused element?](activeElement.md)
* [As `[]` is true, `[]==true` should also be true. Right?](truthy.md)
  * [What is `toPrimitive`?](toPrimitive.md)
* [What is late binding?](lateBinding.md)
* [What does `void` do?](void.md)
* [What are WebComponents?](webComponents.md)


--

## What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?

This is an increasingly common practice, employed by many popular JavaScript libraries (jQuery, Node.js, etc.). This technique creates a closure around the entire contents of the file which, perhaps most importantly, creates a private namespace and thereby helps avoid potential name clashes between different JavaScript modules and libraries.

Another feature of this technique is to allow for an easily referenceable (presumably shorter) alias for a global variable. This is often used, for example, in jQuery plugins. jQuery allows you to disable the $ reference to the jQuery namespace, using jQuery.noConflict(). If this has been done, your code can still use $ employing this closure technique, as follows:

```js
(function($) { /* jQuery plugin code referencing $ */  } )(jQuery)
```
