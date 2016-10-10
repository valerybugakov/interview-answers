# HTML Q&As

## Describe the difference between `<script>`, `<script async>` and `<script defer>`

* Without `async` or `defer`, browser will run your script immediately, 
  before rendering the elements that's below your `script` tag.
* With `async` (asynchronous), browser will continue to load the HTML page 
  and render it while the browser load and execute the script at the same time.
* With `defer`, browser will run your script when the page finished parsing. 
  (not necessary finishing downloading all image files. This is good.)
  
Both `async` and `defer` scripts begin to download immediately without pausing the parser 
and both support an optional onload handler to address the common need to perform 
initialization which depends on the script.

![Usefull illustration](http://i.stack.imgur.com/wfL82.png)
