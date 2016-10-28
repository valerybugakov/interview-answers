## Early Binding vs Late Binding

Early Binding

```js
var sum = function(a, b) {
  return a + b;
};

var x = 5, y = 6;
var sum5n6 = sum.bind(null, x, y);

x = 10;
y = 5;
console.log("with Early Binding -->", sum5n6());
```

Late Binding

```js
var sum2 = function(p) {
  return p.x + p.y;
};

var x = 5, y = 6;
var n = {x: x, y: y};
var sumLate = sum2.bind(null, n);

n.x = 10;
n.y = 5;

console.log("Late Binding -->", sumLate());
```
