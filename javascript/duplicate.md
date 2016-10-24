## Make this work:
```js
[1, 2, 3, 4, 5].duplicate() // [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
```

## Answer

```js
// But we know that extending built-in objects is a bad idea ^_^
Array.prototype.duplicate = function() {
  return this.contat(this)
}
```
