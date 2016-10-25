## What is `toPrimitive`?

The `Symbol.toPrimitive `is a symbol that specifies a function valued property that is called to convert an object to a corresponding primitive value.

Property attributes of Symbol.toPrimitive
 * Writable	no
 * Enumerable	no
 * Configurable	no

With the help of the Symbol.toPrimitive property (used as a function value), an object can be converted to a primitive value. The function is called with a string argument hint, which specifies the preferred type of the result primitive value. The hint argument can be one of "number", "string", and "default".

Following example describes how Symbol.toPrimitive property can modify the primitive value converted from an object.

```js
// An object without Symbol.toPrimitive property.
var obj1 = {};
console.log(+obj1);     // NaN
console.log(`${obj1}`); // "[object Object]"
console.log(obj1 + ""); // "[object Object]"

// An object with Symbol.toPrimitive property.
var obj2 = {
  [Symbol.toPrimitive](hint) {
    if (hint == "number") {
      return 10;
    }
    if (hint == "string") {
      return "hello";
    }
    return true;
  }
};
console.log(+obj2);     // 10      -- hint is "number"
console.log(`${obj2}`); // "hello" -- hint is "string"
console.log(obj2 + ""); // "true"  -- hint is "default"
```
