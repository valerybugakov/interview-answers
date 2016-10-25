## As `[]` is true, `[]==true` should also be true. Right?

You are right about first part, `[]`, empty array is an object and object is always truthy. Hence, if you use `if([]){console.log('its true')}` you will see the log.

However, special case about `==` (double equal) is that it will do some implicit coercion.

Since left and right side of the equality are two different types, JavaScript can't compare them directly . Hence, under the hood, JavaScript will convert them to compare. First, right side of the equality will be coerced to a number and number of true would be `1`.

After that, JavaScript implementation will try to convert `[]` by using `toPrimitive` (of JavaScript implementation). Since `[].valueOf` is not primitive it will use `toString` and will get `""`

Now you are comparing `"" == 1` and still left and right is not same type. Hence left side will be converted again to a number and empty string will be 0.

Finally, they are of same type, you are comparing `0 === 1` which will be false.
