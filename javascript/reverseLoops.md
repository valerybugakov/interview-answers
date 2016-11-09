## Are loops faster in reverse?

It's not that `i--` is faster than `i++`. Actually, they're both equally fast.

What takes time in ascending loops is evaluating, for each i, the size of your array. In this loop:

```js
for(var i = array.length; i--;)
```
You evaluate `.length` only once, when you declare `i`, whereas for this loop

```js
for(var i = 1; i <= array.length; i++)
```
you evaluate `.length` each time you increment `i`, when you check if `i <= array.length`.

In most cases you shouldn't even worry about this kind of optimization.

The fastest loop is
```js
var i = arr.length; //or 10
while(i--)
{
  //...
}
```
