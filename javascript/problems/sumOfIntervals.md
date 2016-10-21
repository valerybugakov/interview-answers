### Description

Write a function called `sumIntervals` that accepts an array of intervals, and returns the sum of all the interval lengths. Overlapping intervals should only be counted once.

#### Intervals

Intervals are represented by a pair of integers in the form of an array. The first value of the interval will always be less than the second value. Interval example: [1, 5] is an interval from 1 to 5. The length of this interval is 4.

#### Overlapping Intervals

List containing overlapping intervals:

```js
[
   [1,4],
   [7, 10],
   [3, 5]
]
```
The sum of the lengths of these intervals is `7`. Since `[1, 4]` and `[3, 5]` overlap, we can treat the interval as `[1, 5]`, which has a length of `4`.

#### Examples:

```js
sumIntervals( [
   [1,2],
   [6, 10],
   [11, 15]
] ); //=> returns 9

sumIntervals( [
   [1,4],
   [7, 10],
   [3, 5]
] ); //=> returns 7

sumIntervals( [
   [1,5],
   [10, 20],
   [1, 6],
   [16, 19],
   [5, 11]
] ); //=> returns 19
```

### Solution

```js
}
function sumIntervals(intervals){
  return intervals
  .sort(
    (a, b) => a[0] > b[0] ? 1 : -1
  ).reduce(
    (ar, i) => {
      if (ar.length && ar[ar.length - 1][1] >= i[0]) {
        ar[ar.length - 1][1] = Math.max(i[1], ar[ar.length - 1][1])
        return ar
      } else {
        ar.push(i)
        return ar
      }
    }, []
  ).reduce(
    (sum, i) => (sum + i[1] - i[0]), 0
  )
}
```

### Sly solution

```js
function sumIntervals(intervals){
  return Object.keys(intervals.reduce(function(hash, interval) {
    for(var i = interval[0]; i < interval[1]; i++) hash[i] = 1;
    return hash;
  }, {})).length;
}
```
