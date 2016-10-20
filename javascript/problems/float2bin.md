## Implement a function called `float2bin` that converts a float number to the corresponding `32-bit` binary value. This involves analysing each part of the input number and appointing each bit of the output accordingly.

### Rules:

* The conversion should match the IEEE754 Single precision 32-bit technical standard.
* The implementation should be able to handle both Strings ("123", "1.23") and Numbers (123, 1.23) as input.
* It should convert both positive and negative numbers.
* The output should always be a 32 characters long string, so padding of 0's is necessary if input is not negative.
* The point of this kata is to teach how floats are build on a binary level, so typed arrays are disabled.

### Ugly solution

```js
var float2bin = function(input) {
  const sign = input < 0 ? '1' : '0'
  input = Math.abs(input)
  const num = parseFloat(input).toString(2)
  const int = parseFloat(~~input).toString(2)
  const prefract = parseFloat(input % 1).toString(2).replace('0.','')
  const exp = parseFloat(127 + (~~input ? int.length - 1 : -prefract.indexOf(1) - 1)).toString(2)
  const fract = ~~input ?
    prefract :
    prefract.slice(prefract.indexOf(1), prefract.indexOf(1) + 22)
  const padding = 32 - 8 - (int.length || 0) - ((int == '0' ? fract.length - 1 : fract.length) || 0)

  return sign
  .concat('0'.repeat(8 - exp.length))
  .concat(exp)
  .concat(((int == '0' ? '' : int).concat(fract)).slice(1))
  .concat('0'.repeat(padding > 0 ? padding : 0))
  .slice(0, 32)
}
```

### Shorter solution

```js
var float2bin = function(input) {
  var
    n0 = +input,
    n = Math.abs(n0),
    e = Math.floor(Math.log(n) / Math.LN2),
    f = n * Math.pow(2, 23 - e) & ~(1 << 23);
  return (n0 >= 0 ? "0" : "1") +
    ("00000000" + (e + 127).toString(2)).slice(-8) +
    ("00000000000000000000000" + f.toString(2)).slice(-23);
}
```
