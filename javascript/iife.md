## Explain why the following doesn't work as an IIFE: `function foo(){  }();`

This is a function definition, it defines `foo`. But it’s not a function expression - that is, it’s not understood by the JS parser to actually call a function.

For the parser, things look like this:

```js
function foo(){
} // ok, done with that function definition
  // (silly human left off the semicolon, how embarrassing!)

(); // Are they trying to call something? What’s the function’s name?
    // PARSE ERROR
```

In order to prep the parser that we're actually dealing with a function expression we have to wrap things up in `()` like so:

```js
( // oh goody, we're going to call some function expressions!
  function foo(){ // here's the function definition
  }() // and here's where the function is actually called
);
```
