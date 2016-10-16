## What's the difference between a variable that is: `null`, `undefined` or undeclared?
### How would you go about checking for any of these states?

In JavaScript, `undefined` means a variable has been declared but has not yet been assigned a value.
A variable is declared if accessing the variable name will not produce a `ReferenceError`.
Assigning a value to an undeclared variable implicitly creates it as a global variable (it becomes a property of the global object) when the assignment is executed. In `strict mode` the `ReferenceError` error is thrown.

```js
// Test if undefined
typeof(a) === "undefined"
// Test if null
a === null
// Test if declared
var aIsDeclared = true;
try{ a; }
catch(e) {
    if(e.name == "ReferenceError") {
        aIsDeclared = false;
    }
}
```
