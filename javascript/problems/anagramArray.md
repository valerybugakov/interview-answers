## Task

Implement anagram checker:
```js
['lol', 'oll', 'react', 'actre', 'llo', 'boom'] =>
[
  ['lol', 'oll', 'llo']
  ['react', 'actre']
]
```

## Solution

```js
function getAnagrams(words) {
  const normalize = word => word.toLowerCase().split('').sort().join('').trim()
  const map = {}
  let n = 0
  
  const anagrams = words.reduce((res, word, i) => {
    const normalized = normalize(word)

    if (typeof map[normalized] === 'number') {
      res[map[normalized]].push(word)
      return res
    }

    map[normalized] = n
    res[n] = [word]
    n++

    return res
  }, [])
  
  return anagrams.filter(arr => arr.length > 1)
}
```
