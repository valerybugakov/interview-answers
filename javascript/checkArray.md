## How do you check if an object is an array or not?

The best way to find out whether or not an object is an instance of a particular class is to use the toString method from Object.prototype:

```js
var arrayList = [1,2,3];
```
One of the best use cases of type-checking an object is when we do method overloading in JavaScript. For example, let's say we have a method called greet, which takes one single string and also a list of strings. To make our greet method workable in both situations, we need to know what kind of parameter is being passed. Is it a single value or a list of values?

```js
 function greet(param){
     if(){ // here have to check whether param is array or not
     }else{
     }
 }
```
However, as the implementation above might not necessarily check the type for arrays, we can check for a single value string and put some array logic code in the else block. For example:

```js
 function greet(param){
     if(typeof param === 'string'){
     }else{
       // If param is of type array then this block of code would execute
     }
 }
```
Now it's fine we can go with either of the aforementioned two implementations, but when we have a situation where the parameter can be single value, array, and object type, we will be in trouble.

Coming back to checking the type of an object, as mentioned previously we can use Object.prototype.toString

```js
if( Object.prototype.toString.call( arrayList ) === '[object Array]' ) {
    console.log('Array!');
}
```
If you are using jQuery, then you can also use the jQuery isArray method:

```js
  if($.isArray(arrayList)){
    console.log('Array');
  }else{
      console.log('Not an array');
  }
```
FYI, jQuery uses Object.prototype.toString.call internally to check whether an object is an array or not.

In modern browsers, you can also use

```js
Array.isArray(arrayList);
```

Array.isArray is supported by Chrome 5, Firefox 4.0, IE 9, Opera 10.5 and Safari 5
