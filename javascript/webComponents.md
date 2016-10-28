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
