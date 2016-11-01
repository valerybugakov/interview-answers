# HTML Q&As

## What does a `doctype` do?

`DOCTYPE`s are required for legacy reasons. When omitted, browsers tend to use a different rendering mode that is incompatible with some specifications. Including the `DOCTYPE` in a document ensures that the browser makes a best-effort attempt at following the relevant specifications.
* The doctype declaration should be the very first thing in an HTML document, before the tag.
* The doctype declaration is not an HTML tag; it is an instruction to the web browser about what version of the markup language the page is written in.

## `window` vs `document`

JavaScript has a global object and everything runs under it. window is that global object that holds global variables, global functions, location, history everything is under it. Besides, setTimeout, ajax call (XMLHttpRequest), console or localStorage are part of window.

document is also under window. document is a property of the window object. document represents the DOM and DOM is the object oriented representation of the html markup you have written. All the nodes are part of document. Hence you can use getElementById or addEventListener on document. These methods are not present in the window object.

```js
window.document === document; //true
window.getElementById; //undefined
document.getElementById; //function getElementById() { [native code] }
```

## How `window` and `iframe` relate to each other?

An iframe actually is considered as a new window with its own document loaded into it. Here is where it may seem a little odd, but does make sense if you think about it. The original, parent window, is responsible for other windows to be loaded, not the document.

![Usefull illustration](http://eligeske.com/wp-content/uploads/2011/01/javascript_dom2.jpg)

The property to access a frame is `window.frames[]`, which is an array of all the frames. If you only have one iframe you access it by using `window.frames[0]`. Since the iframe is also a window object, accessing window properties of that frame is done by using `window.frames[0].mywindowproperty`.


### HTML5 && HTML 4.01

Prior to HTML5, the html was SGML based which required a Document Type Defination to establish rules and grammer for markup. Thus, doctype had other information about the Document Type Defination (DTD).

However, with introduction of HTML5 the DOCTYPE is the only thing needed to enable the STANDARD MODE.

A DOCTYPE is optional for HTML5 documents in the XHTML syntax (i.e., XHTML5 documents):

### Is doctype needed for HTML 5 documents?
A `DOCTYPE` is required for HTML5 documents in the HTML syntax.
XML documents may contain a `DOCTYPE` if desired, but this is not required to conform to this specification.

#### Exceptions
HTML5 documents in the `srcdoc` attribute of an `iframe` element don’t need a `DOCTYPE`.


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
