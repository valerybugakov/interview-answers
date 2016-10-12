/*
 * You have to create a function that takes a positive integer number
 * and returns the next bigger number formed by the same digits:
 *
 * nextBigger(12)==21
 * nextBigger(513)==531
 * nextBigger(2017)==2071
 *
 * If no bigger number can be composed using those digits, return -1:
 *
 * nextBigger(9)==-1
 * nextBigger(111)==-1
 * nextBigger(531)==-1
 *
 */

export default function nextBigger(n) {
  const arr = n.toString().split('')

  for (let i = arr.length - 1; i >= 0; i--) {
    const next = i - 1

    if (arr[i] > arr[next]) {
      const suffix = arr.splice(i).sort()

      suffix.some((el, j) => { // eslint-disable-line
        if (el > arr[next]) {
          return [suffix[j], arr[next]] = [arr[next], suffix[j]] // eslint-disable-line
        }
      })

      return Number(arr.concat(suffix).join(''))
    }
  }

  return -1
}
