## Explain the difference between synchronous and asynchronous functions.

Let's say you have two functions, `foo` and `bar`, which are executing synchronously:

```js
function foo() {
    var returnValue = bar();
    console.log(returnValue);
}

function bar() {
    return "bar";
}
```

In order to make the API "asynchronous" is to change it to use callbacks:

```js
function foo() {
    bar(function(returnValue) {
        console.log(returnValue);
    });
}

function bar(callback) {
    callback("bar");
}
```

But the fact of the matter is, this code is still entirely synchronous. The callback is being executed on the same call stack, and no threading optimizations are being made, no scalability benefits are to be had.

It then becomes a question of code readability and coding style. I personally find the typical `var val = func();` type code more readable and readily understandable. The only drawback is, that if you one day would need to change the functionality of bar so, that it would need to perform some I/O activity or call some other function which is asynchronous, you need to change the API of bar as well.

My personal preference: use traditional, synchronous patterns when applicable. Always use asynchronous style when I/O is involved or when in doubt.

It is very important for APIs to be either 100% synchronous or 100% asynchronous. Consider this example:

```js
// WARNING!  DO NOT USE!  BAD UNSAFE HAZARD!
function maybeSync(arg, cb) {
  if (arg) {
    cb();
    return;
  }

  fs.stat('file', cb);
}
```

This API is hazardous because in the following case:

```js
maybeSync(true, () => {
  foo();
});
bar();
```

It is not clear whether foo() or bar() will be called first.

The following approach is much better:

```js
function definitelyAsync(arg, cb) {
  if (arg) {
    process.nextTick(cb);
    return;
  }

  fs.stat('file', cb);
}
```

Note: the next tick queue is completely drained on each pass of the event loop before additional I/O is processed. As a result, recursively setting nextTick callbacks will block any I/O from happening, just like a while(true); loop.
