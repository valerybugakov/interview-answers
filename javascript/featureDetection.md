## What's the difference between feature detection, feature inference, and using the UA string?

Feature detection checks a feature for existence, e.g.:

```js
if (window.XMLHttpRequest) {
    new XMLHttpRequest();
}
```

Feature inference checks for a feature just like feature detection, but uses another function because it assumes it will also exist, e.g.:

```js
if (document.getElementsByTagName) {
    element = document.getElementById(id);
}
```

Checking the UA string is an old practice and should not be used anymore. You keep changing the UA checks and never benefit from newly implemented features, e.g.:

```js
if (navigator.userAgent.indexOf("MSIE 7") > -1){
    //do something
}
```
