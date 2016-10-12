## Anonymous vs. referenced vs. declared functions

### Anonymous

Anonymous functions are typically used as callbacks.

```js
function takesACallback(callback) {
    // do some interesting things here
    return "The callback says: " + callback();
}

takesACallback(function() {
    return "I'm the callback!";
}); // returns "The callback says: I'm the callback!"
```
See the function that’s a parameter to the takesACallback call? Notice that it doesn’t have a name? That’s an anonymous function.

### Referenced
However, you can still have a reference to an anonymous function, just because it is unnamed it doesn’t mean it’s unreferenced.
Also it's called function expression.
```js
var reference = function() {
    return "I'm still an anonymous function";
}

reference(); // returns "I'm still an anonymous function"
```
The function itself is still anonymous (it doesn’t have a name directly attached to it), but you can call the function by the named reference. Function expressions are not hoisted like function declarations decribed below.

### Declared
Declared functions are not anonymous. They have a name directly attached to the function, with no need for a named reference.
```js
function declared() {
    return "I'm not anonymous function";
}

declared(); // returns "I'm not anonymous function"
```
Writing a named function like this results in a function declaration which if hoisted to the top of the file.

