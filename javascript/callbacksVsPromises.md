## What are the pros and cons of using Promises instead of callbacks?

It is fair to say promises are just syntactic sugar. Everything you can do with promises you can do with callbacks. In fact, most promise implementations provide ways of converting between the two whenever you want.

The deep reason why promises are often better is that they're more **composeable**, which roughly means that combining multiple promises "just works", while combining multiple callbacks often doesn't. For instance, it's trivial to assign a promise to a variable and attach additional handlers to it later on, or even attach a handler to a large group of promises that gets executed only after all the promises resolve. While you can sort of emulate these things with callbacks, it takes a lot more code, is very hard to do correctly, and the end result is usually far less maintainable.

One of the biggest (and subtlest) ways promises gain their composability is by uniform handling of return values and uncaught exceptions. With callbacks, how an exception gets handled may depend entirely on which of the many nested callbacks threw it, and which of the functions taking callbacks has a try/catch in its implementation. With promises, you know that an exception which escapes one callback function will be caught and passed to the error handler you provided with `.catch()`.
