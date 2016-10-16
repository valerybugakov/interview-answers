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
