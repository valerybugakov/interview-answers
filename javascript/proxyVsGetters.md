## What is the pros and cons of using `Proxy` vs Getters and Setters?

Getters and setters interception can be implemented with ES5 property accessors (getter/setter) instead of ES6 `Proxies`. Many popular libraries use this technique, for example `MobX` and `Vue`. Using proxies over accessors has two main advantages and a major disadvantage.

### Expando properties

Expando properties are dynamically added properties in JavaScript. The ES5 technique does not support expando properties since accessors have to be predefined per property to be able to intercept operations. This is a technical reason why central stores with a predefined set of keys are trending nowadays.

On the other hand, the `Proxy` technique does support expando properties, since proxies are defined per object and they intercept operations for every property of the object.

A typical example where expando properties are crucial is with using arrays. JavaScript arrays are pretty much useless without the ability to add or remove items from them. ES5 data binding techniques usually hack around this problem by providing custom or overwritten Array methods.

### Getters and setters

Libraries using the ES5 method provide 'computed' bound properties by some special syntax. These properties have their native equivalents, namely getters and setters. However the ES5 method uses getters/setters internally to set up the data binding logic, so it can not work with property accessors.

Proxies intercept every kind of property access and mutation, including getters and setters, so this does not pose a problem for the ES6 method.

### Browser support

The big disadvantage of using Proxies is browser support. They are only supported in the most recent browsers and the best parts of the Proxy API are non polyfillable. Also their performance is not optimized yet.

### Proxy wrapper

ES6 Proxies can only create a separate "copy" of the original object, but this copy will fail in cases where you try to compare them with `===:`

```js
var obj = { a: 1 }
var proxy = new Proxy(obj, handlers)

obj === proxy // false
```

This introduces more complexity when you are accessing nested properties - you will always need to be careful about whether a value you retrieved is the "real one" or just a proxy, otherwise it can lead to obscure bugs when you rely on `===` comparators.
