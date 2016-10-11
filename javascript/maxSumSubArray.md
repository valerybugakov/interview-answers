# Maximum Sum Subarray

## Task

The maximum sum subarray problem consists in finding the maximum sum of a contiguous subsequence in an array or list of integers:

```js
maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
// should be 6: [4, -1, 2, 1]
```

Easy case is when the list is made up of only positive numbers and the maximum sum is the sum of the whole array. If the list is made up of only negative numbers, return 0 instead.

Empty list is considered to have zero greatest sum. Note that the empty list or array is also a valid sublist/subarray.

## Solution

```js
const maxSequence = function(arr) {
  let sum = 0, max = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
    if (sum > max) {
      max = sum
    }
    if (sum < 0) {
      sum = 0
    }
  }
  return max || 0
}
```

## One-liner

```js
const maxSequence = (a, sum = 0) => a.reduce((max, v) => Math.max(sum = Math.max(sum + v, 0), max), 0)
```
