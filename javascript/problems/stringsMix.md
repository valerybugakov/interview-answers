## Task

Given two strings s1 and s2, we want to visualize how different the two strings are. We will only take into account the lowercase letters (a to z). First let us count the frequency of each lowercase letters in s1 and s2.
```
s1 = "A aaaa bb c"

s2 = "& aaa bbb c d"

s1 has 4 'a', 2 'b', 1 'c'

s2 has 3 'a', 3 'b', 1 'c', 1 'd'
```
So the maximum for 'a' in s1 and s2 is 4 from s1; the maximum for 'b' is 3 from s2. In the following we will not consider letters when the maximum of their occurrences is less than or equal to 1.

We can resume the differences between s1 and s2 in the following string: "1:aaaa/2:bbb" where 1 in 1:aaaa stands for string s1 and aaaa because the maximum for a is 4. In the same manner 2:bbb stands for string s2 and bbb because the maximum for b is 3.

The task is to produce a string in which each lowercase letters of s1 or s2 appears as many times as its maximum if this maximum is strictly greater than 1; these letters will be prefixed by the number of the string where they appear with their maximum value and :. If the maximum is in s1 as well as in s2 the prefix is =:.

In the result, substrings will be in decreasing order of their length and when they have the same length sorted alphabetically (more precisely sorted by codepoint); the different groups will be separated by '/'.

## Solution

```js
const compare = (x, y) => x === y ? 0 : x > y ? -1 : 1

const comparator = (a, b) => {
  if (a.length !== b.length) {
    return compare(a.length, b.length)
  }
  
  return compare(b, a)
}
  
 const mapLetters = string => (
   string.split('').reduce((prev, next) => {
     if (/[a-z]/.test(next)) {
       prev[next] = prev[next] + 1 || 1
     }
    
     return prev
  }, {})
)

function mix(s1, s2) {
  const used = {}
  const map1 = mapLetters(s1)
  const map2 = mapLetters(s2)
  const keys = Object.keys(map1).concat(Object.keys(map2))
  return keys.map(key => {
    if (!used[key]) {
      used[key] = true
      const n1 = map1[key] || 0
      const n2 = map2[key] || 0
      const number = Math.max(n1, n2)
      
      if (number > 1) {    
        const start = n1 === n2 ? '=' : n1 > n2 ? 1 : 2
        return `${start}:${new Array(number).fill(key).join('')}`
      }
    }
  }).filter(a => a).sort(comparator).join('/')
}
```
