## For two given numbers find the greatest common divisor.

### Dumb solution

```js
const gcd = (a, b) => {
  let Min = Math.min(a, b)
  let i = 2
  let gcd = 1
  while (i <= Min) {
    if (a % i === 0 && b % i === 0) {
      gcd = i
    }
    i++
  }
  return gcd
}
export default gcd
```

### Iterative solution

```js
function gcd(a,b) {
    if (a < 0) a = -a;
    if (b < 0) b = -b;
    if (b > a) {var temp = a; a = b; b = temp;}
    while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}
```

### Recursive solution

```js
var gcd = function(a, b) {
    if ( ! b) {
        return a;
    }

    return gcd(b, a % b);
};
```
