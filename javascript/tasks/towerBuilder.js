/*
 *
 *  Build Tower by the following given argument:
 *  number of floors (integer and always greater than 0).
 *
 *  A tower of 3 floors looks like below:
 *
 *  [
 *    '  *  ',
 *    ' *** ',
 *    '*****'
 *  ]
 *
 */

const getFloorLength = n => 1 + (2 * (n - 1))
const getStarString = n => new Array(n).join('*')
const getFloor = (floorLength, starPadding, middle, str) => (
  str.substring(0, middle - starPadding) +
  getStarString(floorLength + 1) +
  str.substring(middle + starPadding)
)

export default function towerBuilder(n) {
  let i = 0
  const res = []
  const lastFloorLength = getFloorLength(n)
  const middle = (lastFloorLength - 1) / 2
  const init = new Array(lastFloorLength).join(' ')

  while (i++ < n) {
    const floorLength = getFloorLength(i)
    const starPadding = (floorLength - 1) / 2
    res.push(getFloor(floorLength, starPadding, middle, init))
  }

  return res
}
