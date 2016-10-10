# HTML Q&As

## What does a `doctype` do?
`DOCTYPE`s are required for legacy reasons. When omitted, browsers tend to use a different rendering mode that is incompatible with some specifications. Including the `DOCTYPE` in a document ensures that the browser makes a best-effort attempt at following the relevant specifications.
* The doctype declaration should be the very first thing in an HTML document, before the tag.
* The doctype declaration is not an HTML tag; it is an instruction to the web browser about what version of the markup language the page is written in.

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
