# Snail Sort

## Problem
Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.

```
array = [[1,2,3],
         [4,5,6],
         [7,8,9]]
snail(array) #=> [1,2,3,6,9,8,7,4,5]
```
For better understanding, please follow the numbers of the next array consecutively:

```
array = [[1,2,3],
         [8,9,4],
         [7,6,5]]
snail(array) #=> [1,2,3,4,5,6,7,8,9]
```

NOTE: The idea is not sort the elements from the lowest value to the highest; the idea is to traverse the 2-d array in a clockwise snailshell pattern.

NOTE 2: The 0×0 (empty matrix) is represented as `[[]]`

## Solution
```js
snail = function(a) {
  const n = a[0].length
  const res = []
  let i = 0
  let j = 0
  
  while (res.length < (n * n)) {
    res.push(a[i][j])
    if (j + 2 > i && j < n - 1 - i) {
      j++
      continue
    } 
    if (j + 1 >= n / 2 && i < j) {
      i++
      continue
    }
     if (i + 1 >= n / 2 && j > n - 1 - i) {
      j--
      continue
    }
    if (j + 1 <= n / 2 && i > j + 1) {
      i--
      continue
    }
  }
  return res
}
```

## Nicer solution
```js
snail = function(array) {
  var result;
  while (array.length) {
    // Steal the first row.
    result = (result ? result.concat(array.shift()) : array.shift());
    // Steal the right items.
    for (var i = 0; i < array.length; i++)
      result.push(array[i].pop());
    // Steal the bottom row.
    result = result.concat((array.pop() || []).reverse());
    // Steal the left items.
    for (var i = array.length - 1; i >= 0; i--)
      result.push(array[i].shift());
  }
  return result;
}
```

## Recursive (not super nice)
```js
function snail(array, level = 0, res = []) {
  const length = array[0].length
  const rightIndex = length - 1 - level
  
  if (res.length === length ** 2) {
     return res
  }
  
  if (level === rightIndex) {
    res.push(array[level][level])
    return res
  }
  
  for (let i = 0; i < 4; i++) {    
    for (let j = level; j < rightIndex; j++) {
      if (i === 0) res.push(array[level][j])
      if (i === 1) res.push(array[j][rightIndex])
      if (i === 2) res.push(array[rightIndex][length - 1 - j])
      if (i === 3) res.push(array[length - 1 - j][level])
    }
  }
  
  return snail(array, level + 1, res)
}
```
