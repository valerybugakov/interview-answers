## Task

Write a program that prints all the numbers from 1 to 100. For multiples of 3, instead of the number, print "Fizz", for multiples of 5 print "Buzz". For numbers which are multiples of both 3 and 5, print "FizzBuzz".

## Solution

```js
for (var i = 1; i <= 100; i++) {
  var f = i % 3 == 0, b = i % 5 == 0;
  console.log(f ? b ? "FizzBuzz" : "Fizz" : b ? "Buzz" : i);
}

// one liner
[...Array(15).keys()].map(i => console.log((++i % 3 ? '' : 'fizz') + (i % 5 ? '' : 'buzz') || i))

// in 53 chars
for(x=0;x++<100;)console.log(x%3||"fizz",x%5||"buzz")


// generator
function * fizzBuzz() {
    var i = 0;
    while (true) {
        ++i;
        var x = 0;
        if (i % 3 === 0 && i % 5 === 0) yield 'Fizz Buzz';
        else if (i % 3 === 0) yield 'Fizz';
        else if (i % 5 === 0) yield 'Buzz';
        else yield i;
    }

}

var gen = fizzBuzz();
for (var i = 0; i < 100; i++) {
    console.log(gen.next().value + ' ');
}


// Fast
console.log(
  Array.apply(null, {length: 100}).map(function(val, index) {
    index++;
    if (index % 15 == 0){return "FizzBuzz";}
    if (index % 3 == 0){return "Fizz";}
    if (index % 5 == 0){return "Buzz";}
    return index;
  }).join('\n')
);
```
