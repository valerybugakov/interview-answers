# Javascript Q&As

## What is event delegation?

Event delegation allows you to avoid adding event listeners to specific nodes. Instead, the event listener is added to one parent. That event listener analyzes bubbled events to find a match on child elements.

Event delegation makes use of two features of JavaScript events: *event bubbling* and the *target element*. When an event is triggered on an element, the same event is also triggered on all of that element’s ancestors. This process is known as event bubbling; the event bubbles up from the originating element to the top of the DOM tree. The original target element of any event is stored in a property of the event object - `event.target`. Using event delegation it’s possible to add an event handler to a parent element, wait for an event to bubble up from a child element and easily determine from which element the event originated.

```js
function handleMenuItemClick(e = window.event) {
  const target = e.target || e.srcElement

  if (target.tagName.toLowerCase() === 'li') {
    // do stuff...
  }
}

document.getElementById('menu').addEventListener('click', handleMenuItemClick)
```

Pros:

- There are less event handlers to setup and reside in memory. This is the big one; better performance and less crashing.
- There’s no need to re-attach handlers after a DOM update. If your page content is generated dynamically you don’t need to add and remove event handlers as elements are loaded or unloaded.

Cons:

- There’s a risk your event management code could become a performance bottleneck, so keep it as lean as possible.
- Not all events bubble. The `blur`, `focus`, `load` and `unload` events don’t bubble like other events. The blur and focus events can actually be accessed using the capturing phase (in browsers other than IE) instead of the bubbling phase but that’s a story for another day.
- You need caution when managing some mouse events. If your code is handling the mousemove event you are in serious risk of creating a performance bottleneck because the mousemove event is triggered so often.

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

## Explain "hoisting"
All declarations, both variables and functions, are processed first, before any part of your code is executed.

When you see `var a = 2`, you probably think of that as one statement.
But JavaScript actually thinks of it as two statements:
`var a` and `a = 2`.

The first statement, the declaration, is processed during the compilation phase.
The second statement, the assignment, is left in place for the execution phase.
Declarations themselves are hoisted, but assignments, even assignments of function expressions, are not hoisted.
What this leads to is that all declarations in a scope, regardless of where they appear,
are processed first before the code itself is executed.

Functions are hoisted first, and then variables.
Function declarations are hoisted, but function expressions are not.

While multiple/duplicate `var` declarations are effectively ignored,
subsequent function declarations do override previous ones.

```js
foo(); // "b"

var a = true;
if (a) {
   function foo() { console.log( "a" ); }
}
else {
   function foo() { console.log( "b" ); }
}
```


## What's the difference between an "attribute" and a "property"?
### Attribute
1. Attributes are defined by HTML, all definitions inside HTML tag are attributes.
2. The type of attributes is always string.

### Property
1. Properties belong to DOM, the nature of DOM is an object in JavaScript. We can get and set properties as we do to a normal object in JavaScript and properties can be any types.
2. Non-custom attributes have 1:1 mapping onto properties, like: `id`, `class`, `title`, etc.
3. Non-custom property (attribute) changes when corresponding attribute (property) changes in most cases.
4. Attribute which has a default value doesn't change when corresponding property changes.

### Best Practice

It is recommended to use properties in JavaScript as it's much easier and faster. Especially for boolean type attributes like: `checked`, `disabled` and `selected`, browser automatically converts them into boolean type properties.

```html
<input id="test" class="blue" type="radio" />
```
#### Good practice

```js
// get id
document.getElementById('test').id;
// set class
document.getElementById('test').className = 'red';
// get and set radio control status
document.getElementById('test').checked;
document.getElementById('test').checked = true;
```

#### Bad practice

```js
// get id
document.getElementById('test').getAttribute('id');
// set class
document.getElementById('test').setAttribute('class', 'red');
```

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

## Explain how `this` works in JavaScript

Determining the `this` binding for an executing function requires finding the direct call-site of that function. Once examined, four rules can be applied to the call-site, in *this* order of precedence:

1. Called with `new`? Use the newly constructed object.

2. Called with `call` or `apply` (or `bind`)? Use the specified object.

3. Called with a context object owning the call? Use that context object.

4. Default: `undefined` in `strict mode`, global object otherwise.

Be careful of accidental/unintentional invoking of the *default binding* rule. In cases where you want to "safely" ignore a `this` binding, a "DMZ" object like `ø = Object.create(null)` is a good placeholder value that protects the `global` object from unintended side-effects.

Instead of the four standard binding rules, ES6 arrow-functions use lexical scoping for `this` binding, which means they adopt the `this` binding (whatever it is) from its enclosing function call. They are essentially a syntactic replacement of `self = this` in pre-ES6 coding.

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
## Explain how JSONP works (and how it's not really Ajax).

Stands for JavaScript Object Notation with Padding

Browsers try to be security conscious. They don’t let your JS talk to just any old server (see Cross Site Scripting). When you make AJAX requests, you can only query your server, not anyone else’s. This is a problem if you want to get data from another server (perhaps see a stream of Tweets). The browsers will not let you make an AJAX call to another server, so you're stuck.

Well, browsers have a caveat. You aren’t allowed to call other servers from your JS, but you are allowed to include a script from another server. You probably already do this with jQuery. Most people include a script tag to get jQuery hosted from Google rather than hosting it themselves. Something like this:

`<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>`
Notice that the domain is ajax.googleapis.com not your-awesome-site.com. Browsers allow this kind of code sharing, but direct calls to an API from JS.

So way back in 2005 someone had the clever idea to take advantage of this caveat. Instead of calling an API directly (which browsers don’t allow) you can call it via a script tag (which is totally legit).

So how does it work?

Create a function in the global space to handle the JSON returned from the API. It doesn’t have to do much, just enough so you can see what you're getting:

```js
function myCallbackFunction(data) {
  console.log(data);
}
```

Next, add a script tag to your page which calls the API and passes it an additional parameter. Something like this:

`<script src="http://cool-stuff.com/api.json?callback=myCallbackFunction"></script>`
Notice the additional parameter? It’s typically called callback, but not always, check the docs for your particular API. Also note the callback parameter’s value. It’s the same as the function we defined earlier. This is crucial! If those names don’t match up you won’t get your data.

An API that’s set up to handle JSONP knows to look for that special parameter. If it’s there, the response isn’t just JSON, but the JSON wrapped (Padded) with the name of the callback. So for us, the API would return:

```js
myCallbackFunction({'awesome': 'data'});
```

Since the API returns to a script tag the JS is immediately executed. So myCallbackFunction gets called. We defined this function earlier, so we'll have `{'awesome': 'data'}` logged to the console!

A few things to note:

Generally you don’t write the script tag yourself. You can get jQuery to do that for you :) To make the same call as we did previously you can just use:

```js
$.ajax({
  url: 'http://cool-stuff.com/api.json',
  dataType: 'jsonp',
  success: function(data) {
    console.log(data);
  }
});
```

Safety First! There’s a reason browsers don’t like you talking to other servers - you never know what those servers will send back! Use good data validation, even if the data is “safe.”

You can only use JSONP for get requests. You can use normal AJAX to do post and delete and all data manipulations, but you cannot do this with JSONP. The practical reason for this is that HTML tags only ever get information, they can’t do anything else (think image tags, links for style sheets, and script tags). The handy reason is that if you owned the API you almost certainly would not want randoms from the internet updating your data.

## Why is extending built-in JavaScript objects not a good idea?

Because it can break other things. Extending built-in types, such as Object or Array is a bad idea in Javascript because other libraries, and even client, can easily be affected. This is especially true for the Object prototype as everything in Javascript extends from it.

Consider this code:
```js
var x = [1,2,3];
for(var i in x) {
  console.log(i);
}
```

It will print
`
// 1
// 2
// 3
`

However if you change the array prototype, like the prolific ExtJS library does,
the code will instead print:
`
// 1
// 2
// 3
// remove
// indexOf
`

With remove and indexOf being methods added to the array prototype by ExtJS.
