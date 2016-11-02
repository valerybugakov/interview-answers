You'll get an entered term (lowercase string) and an array of known words (also lowercase strings). Your task is to find out, which word from the dictionary is most similar to the entered one. The similarity is described by the minimum number of letters you have to add, remove or replace in order to get from the entered word to one of the dictionary. The lower the number of required changes, the higher the similarity between each two words.

Same words are obviously the most similar ones. A word that needs one letter to be changed is more similar to another word that needs 2 (or more) letters to be changed. E.g. the mistyped term berr is more similar to beer (1 letter to be replaced) than to barrel (3 letters to be changed in total).

Extend the dictionary in a way, that it is able to return you the most similar word from the list of known words.

Code Examples:

```js
fruits = new Dictionary(['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry']);
fruits.findMostSimilar('strawbery'); // must return "strawberry"
fruits.findMostSimilar('berry'); // must return "cherry"

things = new Dictionary(['stars', 'mars', 'wars', 'codec', 'codewars']);
things.findMostSimilar('coddwars'); // must return "codewars"

languages = new Dictionary(['javascript', 'java', 'ruby', 'php', 'python', 'coffeescript']);
languages.findMostSimilar('heaven'); // must return "java"
languages.findMostSimilar('javascript'); // must return "javascript" (same words are obviously the most similar ones)
```

### Solution

```js
function Dictionary(words) {
  this.words = words;
}

function d(s1, s2) {
  const memo = {}
  return function _d(m, n, a1, a2) {
    let hash = `${m} ${n} ${s1[m - 1]} ${s2[n - 1]}`
    if (memo[hash]) return memo[hash]
    let res
    if (m == 0) {
      res = n
    } else if (n == 0) {
      res = m
    } else {
      res = Math.min(
        _d(m, n - 1) + 1,
        _d(m - 1, n) + 1,
        _d(m - 1, n - 1) + (s1[m - 1] === s2[n - 1] ? 0 : 1)
      )
    }
    memo[hash] = res
    return res
  }(s1.length, s2.length)
}

Dictionary.prototype.findMostSimilar = function(term) {
  return this.words.map(
    (word) => ({
      word,
      d: d(word, term)
    })
  ).reduce(
    (min, data) => data.d < min.d ? data : min
    ,{ word: '', d: Infinity }
  ).word
}
```
