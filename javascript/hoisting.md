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

In ECMAScript 2015, `let` will hoist the variable to the top of the block. However, referencing the variable in the block before the variable declaration results in a ReferenceError. The variable is in a "temporal dead zone" from the start of the block until the declaration is processed.

```js
function do_something() {
  console.log(foo); // ReferenceError
  let foo = 2;
}
```
