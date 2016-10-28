### Description

We will perform some simple image processing. For simplicity, all images are represented by a 2D array, with only 0's and 1's.

In the first part, you will identify the edges of the features (groups of contiguous 1's) present in the image. You will need to create two functions: outerEdgesOf(arr) and innerEdgesOf(arr). Since a picture is worth a thousand words, consider the following array arr.

```
[0 0 0 0 0 0 0]
[0 0 0 0 0 0 0]
[0 0 1 1 1 1 0]
[0 0 1 1 1 1 0]
[0 0 1 1 1 0 0]
[0 0 0 0 0 0 0]
[0 0 0 0 0 0 0]
```

In the array arr, there is one feature. The outer edge of that feature is

```
[0 0 0 0 0 0 0]
[0 1 1 1 1 1 1]
[0 1 0 0 0 0 1]
[0 1 0 0 0 0 1]
[0 1 0 0 0 1 1]
[0 1 1 1 1 1 0]
[0 0 0 0 0 0 0]
```

As you can see, the outer edge is not part of the original feature but is adjacent to it. For the inner edge, we have

```
[0 0 0 0 0 0 0]
[0 0 0 0 0 0 0]
[0 0 1 1 1 1 0]
[0 0 1 0 1 1 0]
[0 0 1 1 1 0 0]
[0 0 0 0 0 0 0]
[0 0 0 0 0 0 0]
```

The inner edge is the part of the feature that is on the edge of the feature.

Then you will create two functions grow(arr)and shrink(arr) that will grow and shrink all features in the image. In our example above, the grow(arr) function will give

```
[0 0 0 0 0 0 0]
[0 1 1 1 1 1 1]
[0 1 1 1 1 1 1]
[0 1 1 1 1 1 1]
[0 1 1 1 1 1 1]
[0 1 1 1 1 1 0]
[0 0 0 0 0 0 0]
```

The shrink(arr) function gives

```
[0 0 0 0 0 0 0]
[0 0 0 0 0 0 0]
[0 0 0 0 0 0 0]
[0 0 0 1 0 0 0]
[0 0 0 0 0 0 0]
[0 0 0 0 0 0 0]
[0 0 0 0 0 0 0]
```

and shrink(grow(arr)) function gives

```
[0 0 0 0 0 0 0]
[0 0 0 0 0 0 0]
[0 0 1 1 1 1 0]
[0 0 1 1 1 1 0]
[0 0 1 1 1 0 0]
[0 0 0 0 0 0 0]
[0 0 0 0 0 0 0]
```

This can be used for example for reducing noise in the image. Indeed, when shrinking, the noise features disappear while the useful ones stay. After shrinking, you can grow the useful features back to what they were while the noise will not grow back.

All input arrays will be valid non-empty arrays filled with 0's and 1's. However, the arrays will not be all square (n X n), some will have m X n elements. One array can have multiple features.


### Solution

```js
const core = (arr, i, j) => Array(9).fill(null).map(
  (_, k) => {
    try {
      return k!==4 && arr[i + ~~(k/3) - 1][j + k%3 - 1]
    } catch (e) {
      return undefined
    }
  }
).filter(a=>a!==false)

function outerEdgesOf(arr){
  // returns an array with the same dimensions as arr.
  // where the outer edges of the features of arr are highlighted (1)
  console.log('oe')
  return arr.map(
    (row, i) => row.map(
      (el, j) => (el == 0 && core(arr, i, j).some(el=>el)) ? 1 : 0
    )
  )
}

function innerEdgesOf(arr){
  // returns an array with the same dimensions as arr.
  // where the inner edges of the features of arr are highlighted (1)
  console.log('ie')
  return arr.map(
    (row, i) => row.map(
      (el, j) => (el == 1 && core(arr, i, j).some(el=>!el)) ? 1 : 0
    )
  )
}

function grow(arr){
  // returns an array with the same dimensions as arr.
  // where the the features have grown
  console.log('gr')
  return arr.map(
    (row, i) => row.map(
      (el, j) => (el === 1 || (el == 0 && core(arr, i, j).some(el=>el))) ? 1 : 0
    )
  )
}

function shrink(arr){
  // returns an array with the same dimensions as arr.
  // where the the features have shrunk
  console.log('sh')
  return arr.map(
    (row, i) => row.map(
      (el, j) => (el == 1 && core(arr, i, j).every(el=>el)) ? 1 : 0
    )
  )
}
```
