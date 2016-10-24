## Task

This kata explores an engineering problem related to spacecraft software.

From time to time, a satellite will have to determine its orientation as it orbits the earth, such as when it first boots up, or after a micro-meteor hits it, causing it to spin unpredictably.

This is done by using a small camera, called a star tracker camera, for detecting stars. Along with the star tracker is a catalog of known stars in the sky.

In this kata, you have to write a program that matches star tracker camera data with star catalog entries. To simplify the problem, we assume:

The catalog data has been converted to points on the unit sphere (rather than the customary RA/DEC that astronomers use)
The star tracker data has also been converted to points on the unit sphere, only using coordinates relative to the spacecraft's pose
This program expects you to define a `StarTracker` object, which takes a `catalog` argument in its constructor, which is an array of 3D unit vectors representing stars. It also needs a `matches` method, which takes another array of unit vectors called `observations`, and outputs pairs `[c,o]`, where `c` is a star in the `catalog` and `o` is the corresponding star in `observations`.

The test data is synthetic and ideal; your program should return a 1-1 correspondence between the star catalog and the observed stars.

Example:

```js
var catalog = [
  [ 0.6423109603211583, 0.203715328373485, 0.7388752907202909 ],
  [ 0.7275189330711311, 0.2749108543317812, 0.6286018009786585 ],
  [ 0.6679273451884815, 0.10972001690331297, 0.7360941376211358 ],
  [ 0.020757579023139, 0.4236482927451189, 0.9055888951214254 ],
  [ 0.9494538494183702, 0.06670014840323665, 0.30673845215040285 ],
  [ 0.1877152065411528, 0.4442142424628979, 0.8760346500146705 ],
  [ 0.6806501203205427, 0.7007891302807193, 0.21356499850870678 ] ];

var observations = [
  [ 0.7597810892539221, -0.0752935577719106, 0.6458045962751986 ],
  [ 0.29342551440616566, 0.38653267964946075, 0.874353449732135 ],
  [ 0.852084649661814, 0.5226519302770312, 0.02804834377281004 ],
  [ 0.6124503176982832, 0.617304354301765, 0.4938015213740773 ],
  [ 0.533453666103194, 0.6695033728133594, 0.5169065872211323 ],
  [ 0.8369541313820854, 0.5285367363210877, -0.14197429458008354 ],
  [ 0.6214512444287408, 0.5031847305287902, 0.6005026875548838 ] ];

new StarTracker(catalog).matches(observations);

/*
Returns:

[ [ [ 0.6423109603211583, 0.203715328373485, 0.7388752907202909 ],
    [ 0.6124503176982832, 0.617304354301765, 0.4938015213740773 ] ],
  [ [ 0.7275189330711311, 0.2749108543317812, 0.6286018009786585 ],
    [ 0.6214512444287408, 0.5031847305287902, 0.6005026875548838 ] ],
  [ [ 0.6679273451884815, 0.10972001690331297, 0.7360941376211358 ],
    [ 0.533453666103194, 0.6695033728133594, 0.5169065872211323 ] ],
  [ [ 0.020757579023139, 0.4236482927451189, 0.9055888951214254 ],
    [ 0.8369541313820854, 0.5285367363210877, -0.14197429458008354 ] ],
  [ [ 0.9494538494183702, 0.06670014840323665, 0.30673845215040285 ],
    [ 0.29342551440616566, 0.38653267964946075, 0.874353449732135 ] ],
  [ [ 0.1877152065411528, 0.4442142424628979, 0.8760346500146705 ],
    [ 0.852084649661814, 0.5226519302770312, 0.02804834377281004 ] ],
  [ [ 0.6806501203205427, 0.7007891302807193, 0.21356499850870678 ],
    [ 0.7597810892539221, -0.0752935577719106, 0.6458045962751986 ] ] ]
*/
```

## Solution

```js
const distance = (x1, y1, z1, x2, y2, z2) => (
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2)
)

const getDistances = stars => stars.map((coords, starIndex, arr) => (
  arr
    .filter((c, anotherStartIndex) => starIndex !== anotherStartIndex)
    .map(set => distance(...coords, ...set).toFixed(13)))
)

function StarTracker(catalog) {
  this.catalog = catalog
  this.distances = getDistances(catalog)
}

StarTracker.prototype.matches = function(observations) {
  return this.distances.map((dist1, catalogIndex) => {
    const matchIndex = getDistances(observations).reduce((prev, dist2, observationIndex) => (
      dist1.every(value => dist2.includes(value)) ? observationIndex : prev
    ), 0)

    return [this.catalog[catalogIndex], observations[matchIndex]]
  })
}
```
