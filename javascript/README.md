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

# What is the difference between `==` and `===`?
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
