## What is primitive data type?

A **primitive** (primitive value, primitive data type) is data that is not an object and has no methods. In JavaScript, there are 6 primitive data types: `string`, `number`, `boolean`, `null`, `undefined`, `symbol` (new in *ECMAScript 2015*).

Most of the time, a primitive value is represented directly at the lowest level of the language implementation.

All primitives are **immutable** (cannot be changed).

A primitive type has a fixed size in memory. For example, a number occupies eight bytes of memory, and a boolean value can be represented with only one bit. The number type is the largest of the primitive types. If each JavaScript variable reserves eight bytes of memory, the variable can directly hold any primitive value.

Reference types are another matter, however. Objects, for example, can be of any length -- they do not have a fixed size. Since these types do not have a fixed size, their values cannot be stored directly in the eight bytes of memory associated with each variable. Instead, the variable stores a reference to the value. Typically, this reference is some form of pointer or memory address. It is not the data value itself, but it tells the variable where to look to find the value.

The distinction between primitive and reference types is an important one, as they behave differently. Consider the following code that uses numbers (a primitive type):

```js
let a = 3.14  // Declare and initialize a variable
let b = a     // Copy the variable's value to a new variable
a = 4         // Modify the value of the original variable
alert(b)      // Displays 3.14; the copy has not changed
```

There is nothing surprising about this code. Now consider what happens if we change the code slightly so that it uses arrays (a reference type) instead of numbers:

```js
let a = [1, 2, 3]  // Initialize a variable to refer to an array
let b = a        // Copy that reference into a new variable
a[0] = 99        // Modify the array using the original reference
alert(b)         // Display the changed array [99, 2, 3] using the new reference
```

### Primitive wrapper objects in JavaScript
Except for `null` and `undefined`, all primitive values have object equivalents that wrap around the primitive values:

- `String` for the string primitive.
- `Number` for the number primitive.
- `Boolean` for the Boolean primitive.
- `Symbol` for the Symbol primitive.

The wrapper's `valueOf()` method returns the primitive value.
