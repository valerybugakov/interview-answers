## Why is extending built-in JavaScript objects not a good idea?

Because it can break other things. Extending built-in types, such as Object or Array is a bad idea in Javascript because other libraries, and even client, can easily be affected. This is especially true for the Object prototype as everything in Javascript extends from it.

Consider this code:
```js
const x = [1, 2, 3]
for (const i in x) {
  console.log(i)
}
```

It will print
```js
// 1
// 2
// 3
```

However if you change the array prototype, like in example below,
the code will instead print:
```js
Array.prototype.lalka = () => console.log('lalka')

// 1
// 2
// 3
// lalka
```

With lalka method added to the array prototype by us which can break some other library.
