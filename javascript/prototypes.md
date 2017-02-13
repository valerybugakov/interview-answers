## How prototypal inheritance works

JavaScript objects are dynamic "bags" of properties (referred to as own properties). Each object has an internal link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with `null` as its prototype. `null`, by definition, has no prototype, and acts as the final link in this prototype chain. When trying to access a property of an object, the property will not only be sought on the object but on the prototype of the object, the prototype of the prototype, and so on until either a property with a matching name is found or the end of the prototype chain is reached.

Traditional `new` inheritance:

The new operator takes a function F and arguments: new F(arguments...). It does three easy steps:
- Create the instance of the class. It is an empty object with its __proto__ property set to F.prototype.
- Initialize the instance. The function F is called with the arguments passed and this set to be the instance.
- Return the instance

```js
function New (f) {
  var n = { '__proto__': f.prototype }

  return function () {
    f.apply(n, arguments)
    return n
  }
}

function Point(x, y) {
  this.x = x
  this.y = y
}

Point.prototype = {
  print: function () {
    console.log(this.x, this.y)
  }
}

var p = new Point(10, 20)
p.print() // 10 20
```

ECMAScript 5 introduced a new method: Object.create(). Calling this method creates a new object. The prototype of this object is the first argument of the function:

```js
Object.create = function (parent) {
  function F() {}
  F.prototype = parent
  return new F()
}

// Same polyfill using deprecated `__proto__` property
Object.create = function (parent) {
  return { '__proto__': parent  }
}

var Point = {
  x: 0,
  y: 0,
  print: function () {
    console.log(this.x, this.y)
  }
}

var p = Object.create(Point)
p.x = 10
p.y = 20
p.print() // 10 20
```
The lookup time for properties that are high up on the prototype chain can have a negative impact on performance, and this may be significant in code where performance is critical. Additionally, trying to access nonexistent properties will always traverse the full prototype chain.


Another example:
```js
function Parent(name) {
  this.name = name
}

Parent.prototype = {
  sayLol() {
    console.log(this.name + ' lol')
  }
}

p = new Parent('bob')
p.sayLol()
console.log('------ after Parent ------')

function Child(lastname) {
  Parent.call(this, lastname)
  this.lastname = lastname
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

Child.prototype.sayOmg = function() {
  console.log(this.lastname + ' omg')
}

c = new Child('dilan')
c.sayLol()
c.sayOmg()
```
