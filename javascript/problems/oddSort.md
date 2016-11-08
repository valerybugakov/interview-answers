## Task

Implement Odd sort (sort only odd indices)

```js
const a = [2, 5, 4, 6, 8, 4, 3, 7, 8]
//=> b = [2, 3, 4, 6, 8, 4, 5, 7, 8]
```

## Solution

Implementation of Quick sort only for odd indices.

```js
const swap = (array, i, j) => [array[i], array[j]] = [array[j], array[i]]

const oddSort = (array, left = 0, r) => {
	const right = r || array.length
	if (right - left < 4 || array.length < 4) {
		return array
    }
	
	const pivot = left + 1
	let border = left + 1
	
	for (let i = border + 2; i < array.length; i += 2) {
		if (array[i] < array[pivot]) {
			if (pivot !== border) {
				swap(array, border, i)
            }
			border += 2
        }
    }
	
	swap(array, border, pivot)
  
	const offset = (right - left) % 4 > 0 ? -1 : 1 // To process arrays with odd length
    oddSort(array, left, border - offset)
    oddSort(array, border + offset, right)

	return array
}	
```
