## Explain `Function.prototype.bind`

The `bind()` method creates a new function that, when called, has its `this` keyword set to the provided value, with a given sequence of arguments preceding any provided when this function is called.

```js
const bindedFunction = fn.bind(thisArg[, arg1[, arg2[, ...]]])
```
`thisArg` is ignored if `bindedFunction` is constructed using `new` operator.

### Spec description

New **Bound function (BF)** is an **exotic function object** that wraps the original function object. **BF** has the following internal properties:

- **[[BoundTargetFunction]]** - the wrapped function object;
- **[[BoundThis]]** - the value that is always passed as the this value when calling the wrapped function.
- **[[BoundArguments]]**  - a list of values whose elements are used as the first arguments to any call to the wrapped function.
- **[[Call]]** - executes code associated with this object. Invoked via a function call expression. The arguments to the internal method are a this value and a list containing the arguments passed to the function by a call expression.

A bound function may also be constructed using the new operator: doing so acts as though the target function had instead been constructed. The provided this value is ignored, while prepended arguments are provided to the emulated function.

### Use cases

- Creating a bound function

```js
this.x = 9; 
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();   
// returns 9 - The function gets invoked at the global scope

// Create a new function with 'this' bound to module
// New programmers might confuse the
// global var x with module's property x
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```

- Partially applied functions

```js
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

// Create a function with a preset leading argument
var leadingThirtysevenList = list.bind(null, 37);

var list2 = leadingThirtysevenList(); 
// [37]

var list3 = leadingThirtysevenList(1, 2, 3);
// [37, 1, 2, 3]
```

- With `setTimeout` to access specific context instead of default global object
- Bound functions used as constructors (partial constructor application)
- Creating shortcuts
