## What are Web Components?

Web Components consists of several separate technologies. You can think of Web Components as reusable user interface widgets that are created using open Web technology. They are part of the browser, and so they do not need external libraries like jQuery or Dojo. An existing Web Component can be used without writing code, simply by adding an import statement to an HTML page. Web Components use new or still-developing standard browser capabilities.

Sometimes there is some confusion regarding Web Components and Google Polymer. Polymer is a framework that is based on Web Components technologies. You can make and use Web Components without Polymer.

Web Components are not fully implemented in all browsers yet, and so to use them right now in most browsers (January 2015) you will probably need to use polyfills to fill in the gaps in browser coverage. Polyfills are available in the Google Polymer project.

Web Components consists of these four technologies (although each can be used separately):

* Custom Elements
* HTML Templates
* Shadow DOM
* HTML Imports

The Web Components specifications define the following items:

* New HTML elements: `<template>` and `<shadow>` (`<element>`, `<content>` and `<decorator>` have been removed)
* The associated API interfaces for the new elements: `HTMLTemplateElement`, `HTMLContentElement` (removed from spec) and `HTMLShadowElement`
* Extensions to the `HTMLLinkElement` interface and the `<link>` element
* An API for registering custom elements, `document.registerElement()`, and modifications of `document.createElement()` and `document.createElementNS()`
* New "lifecycle callbacks" can be added to the prototype that a custom element is based on
* A new CSS pseudo-class to style elements by default, `:unresolved`.
* The Shadow DOM: `ShadowRoot` and `Element.createShadowRoot()`, `Element.getDestinationInsertionPoints()`, `Element.shadowRoot`
* An extension to the Event interface, `Event.path`
* Extensions to the Document interface
* For styling Web Components:
  * New pseudo-classes: `:host`, `:host()`, `:host-context()`
  * New pseudo-elements: `::shadow` (likely to be dropped) and `::content`
  * A new combinator, `>>>` (likely to be dropped)


### Basic Shadow DOM
Shadow DOM must always be attached to an existing element. The element can be either a literal element in an HTML file, or an element created in the DOM by scripting. It can be a native element like `<div>` or `<p>`, or a custom element like `<my-element>`. You attach shadow DOM using `Element.attachShadow()` like in this example:

```html
  <html>
    <head></head>
    <body>
      <p id="hostElement"></p>
      <script>
        // create shadow DOM on the <p> element above
        var shadow = document.querySelector('#hostElement').attachShadow();
      </script>
    </body>
  </html>
```

The example above adds shadow DOM to a literal <p> element that has no content. Nothing is displayed yet. Continuing with the same example, you can insert text into the shadow DOM above with code like the following, and it will display in the browser:

```js
shadow.innerHTML = '<p>Here is some new text</p>';
```

### Styling Shadow DOM

You use the `<style>` element to add CSS to shadow DOM. Using the same example, this code will make the shadow DOM text red:

```html
<script>
  // Create shadow DOM
  var shadow = document.querySelector('#hostElement').createShadowRoot();
  // Add some text to shadow DOM
  shadow.innerHTML = '<p>Here is some new text</p>';
  // Add some CSS to make the text red
  shadow.innerHTML += '<style>p { color: red; }</style>';
</script>
```

### HTML file

```html
If nothing appeared below, then your browser is not supporting Custom Elements.
<x-product data-name="Ruby" data-img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4621/ruby.png" data-url="http://example.com/1"></x-product>
<x-product data-name="JavaScript" data-img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4621/javascript.png" data-url="http://example.com/2"></x-product>
<x-product data-name="Python" data-img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4621/python.png" data-url="http://example.com/3"></x-product>
```

### JS file

```js
// Create a class for the element
class XProduct extends HTMLElement {
  constructor() {
    // Always call super first in ctor
    super();

    // Create a shadow root
    var shadow = this.attachShadow({mode: 'open'});

    // Create a standard img element and set it's attributes.
    var img = document.createElement('img');
    img.alt = this.getAttribute('data-name');
    img.src = this.getAttribute('data-img');
    img.width = '150';
    img.height = '150';
    img.className = 'product-img';

    // Add the image to the shadow root.
    shadow.appendChild(img);

    // Add an event listener to the image.
    img.addEventListener('click', () => {
      window.location = this.getAttribute('data-url');
    });

    // Create a link to the product.
    var link = document.createElement('a');
    link.innerText = this.getAttribute('data-name');
    link.href = this.getAttribute('data-url');
    link.className = 'product-name';

    // Add the link to the shadow root.
    shadow.appendChild(link);
  }
}

// Define the new element
customElements.define('x-product', XProduct);
```

### CSS file:

```css
body {
  background: #F7F7F7;
}

x-product {
  display: inline-block;
  float: left;
  margin: 0.5em;
  border-radius: 3px;
  background: #FFF;
  box-shadow: 0 1px 3px rgba(0,0,0,0.25);
  font-family: Helvetica, arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

x-product::slotted(.product-img) {
  cursor: pointer;
  background: #FFF;
  margin: 0.5em;
}

x-product::slotted(.product-name) {
  display: block;
  text-align: center;
  text-decoration: none;
  color: #08C;
  border-top: 1px solid #EEE;
  font-weight: bold;
  padding: 0.75em 0;
}
```
