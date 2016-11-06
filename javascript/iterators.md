A couple of additions to ECMAScript 2015 (ES6) aren't new built-ins or syntax, but protocols. These protocols can be implemented by any object respecting some conventions.

There are two protocols: The iterable protocol and the iterator protocol.

### The iterable protocol
The iterable protocol allows JavaScript objects to define or customize their iteration behavior, such as what values are looped over in a `for..of` construct. Some built-in types are built-in iterables with a default iteration behavior, such as Array or Map, while other types (such as Object) are not.

In order to be iterable, an object must implement the @@iterator method, meaning that the object (or one of the objects up its prototype chain) must have a property with a @@iterator key which is available via constant `Symbol.iterator`:

Whenever an object needs to be iterated (such as at the beginning of a for..of loop), its @@iterator method is called with no arguments, and the returned iterator is used to obtain the values to be iterated.

### The iterator protocol
The iterator protocol defines a standard way to produce a sequence of values (either finite or infinite).

An object is an iterator when it implements a next() method with the following semantics:

`next` – A zero arguments function that returns an object with two properties:

* `done` Has the value true if the iterator is past the end of the iterated sequence. In this case value optionally specifies the return value of the iterator. The return values are explained here.
Has the value false if the iterator was able to produce the next value in the sequence. This is equivalent of not specifying the done property altogether.
* `value` - any JavaScript value returned by the iterator. Can be omitted when done is true.
The next method always has to return an object with appropriate properties including done and value. If a non-object value gets returned (such as false or undefined), a TypeError ("iterator.next() returned a non-object value") will be thrown.

Some iterators are in turn iterables:

```js
var someArray = [1, 5, 7];
var someArrayEntries = someArray.entries();

someArrayEntries.toString();           // "[object Array Iterator]"
someArrayEntries === someArrayEntries[Symbol.iterator]();    // true
```

### Examples using the iteration protocols
A String is an example of a built-in iterable object:

```js
var someString = "hi";
typeof someString[Symbol.iterator];          // "function"
```

String's default iterator returns the string's characters one by one:

```js
var iterator = someString[Symbol.iterator]();
iterator + "";                               // "[object String Iterator]"

iterator.next();                             // { value: "h", done: false }
iterator.next();                             // { value: "i", done: false }
iterator.next();                             // { value: undefined, done: true }
```

Some built-in constructs, such as the spread operator, use the same iteration protocol under the hood:

```js
[...someString]                              // ["h", "i"]
```

We can redefine the iteration behavior by supplying our own @@iterator:

```js
var someString = new String("hi");          // need to construct a String object explicitly to avoid auto-boxing

someString[Symbol.iterator] = function() {
  return { // this is the iterator object, returning a single element, the string "bye"
    next: function() {
      if (this._first) {
        this._first = false;
        return { value: "bye", done: false };
      } else {
        return { done: true };
      }
    },
    _first: true
  };
};
```

Notice how redefining @@iterator affects the behavior of built-in constructs, that use the iteration protocol:

```js
[...someString];                              // ["bye"]
someString + "";                              // "hi"
```

### Iterable examples

#### Builtin iterables

String, Array, TypedArray, Map and Set are all built-in iterables, because the prototype objects of them all have an @@iterator method.

#### User-defined iterables

We can make our own iterables like this:

```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable]; // [1, 2, 3]
```

#### Builtin APIs accepting iterables

There are many APIs accepting iterables, for example: Map([iterable]), WeakMap([iterable]), Set([iterable]) and WeakSet([iterable]):

```js
var myObj = {};
new Map([[1,"a"],[2,"b"],[3,"c"]]).get(2);               // "b"
new WeakMap([[{},"a"],[myObj,"b"],[{},"c"]]).get(myObj); // "b"
new Set([1, 2, 3]).has(3);                               // true
new Set("123").has("2");                                 // true
new WeakSet(function*() {
    yield {};
    yield myObj;
    yield {};
}()).has(myObj);                                         // true
But also Promise.all(iterable), Promise.race(iterable), and Array.from().
```

#### Syntaxes expecting iterables

Some statements and expressions are expecting iterables, for example the for-of loops, spread operator, yield*, and destructuring assignment.

```js
for(let value of ["a", "b", "c"]){
    console.log(value);
}
// "a"
// "b"
// "c"

[..."abc"]; // ["a", "b", "c"]

function* gen(){
  yield* ["a", "b", "c"];
}

gen().next(); // { value:"a", done:false }

[a, b, c] = new Set(["a", "b", "c"]);
a // "a"
```

#### Non-well-formed iterables

If an iterable's @@iterator method doesn't return an iterator object, then it's a non-well-formed iterable, using it as such is likely to result in runtime exceptions or buggy behavior:

```js
var nonWellFormedIterable = {}
nonWellFormedIterable[Symbol.iterator] = () => 1
[...nonWellFormedIterable] // TypeError: [] is not a function
```

### Iterator examples
#### Simple iterator

```js
function makeIterator(array){
    var nextIndex = 0;

    return {
       next: function(){
           return nextIndex < array.length ?
               {value: array[nextIndex++], done: false} :
               {done: true};
       }
    };
}

var it = makeIterator(['yo', 'ya']);

console.log(it.next().value); // 'yo'
console.log(it.next().value); // 'ya'
console.log(it.next().done);  // true
```

#### Infinite iterator

```js
function idMaker(){
    var index = 0;

    return {
       next: function(){
           return {value: index++, done: false};
       }
    };
}

var it = idMaker();

console.log(it.next().value); // '0'
console.log(it.next().value); // '1'
console.log(it.next().value); // '2'
// ...
```

#### With a generator

```js
function* makeSimpleGenerator(array){
    var nextIndex = 0;

    while(nextIndex < array.length){
        yield array[nextIndex++];
    }
}

var gen = makeSimpleGenerator(['yo', 'ya']);

console.log(gen.next().value); // 'yo'
console.log(gen.next().value); // 'ya'
console.log(gen.next().done);  // true



function* idMaker(){
    var index = 0;
    while(true)
        yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // '0'
console.log(gen.next().value); // '1'
console.log(gen.next().value); // '2'
// ...
```

### Is a generator object an iterator or an iterable?
A generator object is both, iterator and iterable:

```js
var aGeneratorObject = function*(){
    yield 1;
    yield 2;
    yield 3;
}();
typeof aGeneratorObject.next;
// "function", because it has a next method, so it's an iterator
typeof aGeneratorObject[Symbol.iterator];
// "function", because it has an @@iterator method, so it's an iterable
aGeneratorObject[Symbol.iterator]() === aGeneratorObject;
// true, because its @@iterator method return its self (an iterator), so it's an well-formed iterable
[...aGeneratorObject];
// [1, 2, 3]
```
