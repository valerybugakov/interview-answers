## Implement Maybe modan

I find the `Maybe` monad to be the easiest one to wrap my head around. Thus, it is the first in what may be a series of katas about monads.

Every monad must support two operations:

- `return` or `unit` which takes a value and wraps it in whatever container the monad needs it to be wrapped in
- `bind` (called `>>=` in Haskell) which takes a function and returns a function.
The input function to bind is a function that takes a value (not in the monad) as an argument and returns a value in the monad. The output function from bind is a function that takes a value in the monad and returns a value in the monad.

Note: Technically, the input function can take a value not in the monad to a value in any monad and bind would return a function that takes a value in this monad and returns a value in whatever monad the input function returned a value in. It is hard to really get the benefits of doing that in a weakly-typed language like Coffeescript so for this kata there will only be one monad.

There are some laws that dictate how unit and bind must compose. Here is what the monad laws look like in Coffeescript or Javascript (where f and g are functions that take a value argument and return a monad value):

```js
bind(f)(unit(x)) === f(x)                            // for any value x  (left identity)
bind(unit)(x) === x                                  // for any value x  (right identity)
bind(g)(bind(f)(m)) ===
  bind( function (x) { return bind(g)(f(x)); } )(m)  // for any m in the monad  (associativity)
```
Sorting all of that out is tough. Remember that bind returns a function that takes monad values to monad values. For example, the last line asserts that both of the following functions always return the same thing as long as m is a valid monad value, f is a function from values to values in the monad, and g is a function from values to values in the monad:

```js
function lhs(m,f,g) {
  var bg = bind(g);
  var bf = bind(f);
  return bg(bf(m));
}

function rhs(m,f,g) ->
  var bg = bind(g);
  var ba = bind( function (x) { return bg(f(x)); } );
  return ba(m);
}
```

You probably don't need to completely understand the above to succeed in this kata.

### Other monad operations

For convenience, monads often support a lift function which takes a function from values to values and returns a function from values to the monad values.

Our monads will also support a do function which takes a monad value and an arbitrary number of functions (which take a value as an argument and return a monad value). The do function binds the first function with the monad and passes it the argument value. It then uses the return value of that first bound function as the input for the next function, etc. It finally returns the last result. So, for example: do(m, f, g, h) should be equivalent to:
```js
var bf = bind(f);
var bg = bind(g);
var bh = bind(h);
bh(bg(bf(m)));
```

### The Maybe monad

The Maybe monad has two types of values Just x and Nothing values. These classes are already written here.

```js
function Just (x) {
  this.toString = function () { return "Just " + x.toString(); };
  this.just = x;
  Object.freeze(this);
};
Just.prototype = new Maybe();
Just.prototype.constructor = Just;

function Nothing () {
  this.toString = function () { return "Nothing"; };
  Object.freeze(this);
};
Nothing.prototype = new Maybe();
Nothing.prototype.constructor = Nothing;
You need to fill in the class methods on the Maybe class:

Maybe.unit = function (x) { ... };
Maybe.bind = function (f) { ... };
Maybe.lift = function (f) { ... };
Maybe.do = function (m,fns) { ... };
```
Here's a graphical depiction of how @lift and @bind are related: 

The `@unit` function should return a Maybe subclass instance which wraps the value x:

```js
Maybe.unit(x) instanceof Maybe   // => true
```
The @bind function should take the function f which has a single input argument value and returns a Maybe subclass instance. The @bind function should return a new function which takes one Maybe subclass instance as an argument. If the argument is Just x, then the returned function should return (f x). If the argument is Nothing, then the returned function should return Nothing. If the argument is not a Maybe subclass instance, then the returned function should throw an error.

```js
function mDup(str) {
  return new Just(str+str);
}
mDup("abc");           // => new Just("abcabc")

var bmDup = Maybe.bind(mDup);
bmDup(new Nothing)     // => new Nothing
bmDup(new Just("abc")) // => new Just("abcabc")
```

The @lift function should take the function f which has a single input argument value and returns a value. The @lift function should return a new function of a single argument x that wraps the results of (f x) in a Maybe subclass instance. If evaluation of (f x) throws an exception of any kind, then this function should return a Nothing instances, otherwise it should return a Just instance containing (f x).

```js
function nonnegative(x) {
  if (isNaN(x) || 0 <= x) {
    return x;
  } else {
    throw "Argument " + x + " must be non-negative";
  }
}
var mNonnegative = Maybe.lift(nonnegative)

mNonnegative(2)           // => new Just 2
mNonnegative(-1)          // => new Nothing
mNonnegative(undefined)   // => new Just undefined
```

The @do function should take a Maybe subclass instance m and a sequence of functions, bind each of the functions using @bind, call the first bound function, pass that value to the second bound function, etc. and return the final function's return value.

```js
var mDup = Maybe.lift( function (s) { return  s+s; } );
var mTrim = Maybe.lift( function (s) { return s.replace(/\s+$/, ''); } );

Maybe.do( Maybe.unit("abc "), mDup, mTrim, mDup )   // => new Just "abc abcabc abc"
```

## Solution

```js
function Maybe () {
  Object.freeze(this);
}

Maybe.unit = x => (
  typeof x !== 'undefined' ? new Just(x): new Nothing()
)

Maybe.bind = f => x => {
  if (!(x instanceof Maybe)) {
    throw new Error('boom')
  }
  
  return x instanceof Nothing ? x : f(x.just)
}

Maybe.lift = f => x => {
  try {
    return new Just(f(x))
  } catch (err) {
    return new Nothing()
  }
}

Maybe.do = (x, ...fns) => (
  fns.reduce((prev, f) => Maybe.bind(f)(prev), x)
)

function Just (x) {
  this.toString = () => `Just ${x.toString()}`
  this.just = x
  Object.freeze(this)
}
Just.prototype = new Maybe()
Just.prototype.constructor = Just


function Nothing () {
  this.toString = () => "Nothing"
  Object.freeze(this)
}
Nothing.prototype = new Maybe()
Nothing.prototype.constructor = Nothing
```
