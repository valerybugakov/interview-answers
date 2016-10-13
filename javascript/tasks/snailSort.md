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
