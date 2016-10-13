## What is a closure, and how/why would you use one?

Several defenitions:

* closure is when a function is able to remember and access its lexical scope even when that function 
  is executing outside its lexical scope.
* a closure is one way of supporting first-class functions; 
  it is an __expression that can reference variables within its scope__ (when it was first declared), 
  assigned to a variable, passed as an argument to a function, or returned as a function result.
* a closure is a __stack frame__ which is allocated when a function starts its execution, 
  and not freed after the function returns (as if a 'stack frame' were allocated on the heap rather than the stack!).
