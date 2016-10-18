## When would you use `document.write()`?
Generally `document.write` is considered a bad practice.
But it is the simpliest way to include third party content into the document.
Also the shortest, and it does not cause any conflicts.
You may also use `document.write` to:
* include styles that should only work if JavaScript is enabled.
* alter all the content of the iframe (this approach have been used to partially update the page before AJAX)
