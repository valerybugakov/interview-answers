Point in Polygon

### The problem

You're going write a function called pointInPoly to test if a point is inside a polygon.

Points will be represented as [x,y] arrays.

The polygon will be an array of points which are the polygon's vertices. The last point in the array connects back to the first point.

You can assume:

The polygon will be a valid simple polygon. That is, it will have at least three points, none of its edges will cross each other, and exactly two edges will meet at each vertex.
In the tests, the point will never fall exactly on an edge of the polygon.


### Solution

```js
//Return true if point is inside poly, and false if it is not
function pointInPoly(poly, point) {
  let num = poly.length
  let i = 0
  let j = num - 1
  let c = false
  for (i=0; i < num; i++) {
    if (
      (poly[i][1] > point[1]) != (poly[j][1] > point[1]) &&
      (point[0] < (poly[j][0] - poly[i][0]) * (point[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0])
    ) {
      c = !c
    }            
    j = i
  }  
  return c
}
```
