## Task

Are two strings permutations of each other?

## Solution

```js
function isPermutation(one, two) {
  if (typeof one !== 'string') {
    throw new Error('The given word is not a string');
  }
  if (typeof two !== 'string') {
    throw new Error('The given word is not a string');
  }

  if (one.length !== two.length) {
    return false;
  }

  const letters = [];
  let i;

  for (i = 0; i < one.length; i++) {
    letters[one[i].charCodeAt()] = letters[one[i].charCodeAt()] || 0 + 1;
  }

  for (i = 0; i < two.length; i++) {
    letters[two[i].charCodeAt()] = letters[two[i].charCodeAt()] || 0 - 1;
    if (letters[two[i].charCodeAt()] < 0) {
      return false;
    }
  }

  return true;
}
```
