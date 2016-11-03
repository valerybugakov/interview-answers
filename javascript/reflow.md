## What is browser reflow?

Reflow is the name of the web browser process for re-calculating the positions and geometries of elements in the document, for the purpose of re-rendering part or all of the document. Because reflow is a user-blocking operation in the browser, it is useful for developers to understand how to improve reflow time and also to understand the effects of various document properties (DOM depth, CSS rule efficiency, different types of style changes) on reflow time. Sometimes reflowing a single element in the document may require reflowing its parent elements and also any elements which follow it.

Reflow occurs when you:

insert, remove or update an element in the DOM
modify content on the page, e.g. the text in an input box
move a DOM element
animate a DOM element
take measurements of an element such as offsetHeight or getComputedStyle
change a CSS style
change the className of an element
add or remove a stylesheet
resize the window
scroll

Guidelines

Here are some easy guidelines to help you minimize reflow in your web pages:

- Reduce unnecessary DOM depth. Changes at one level in the DOM tree can cause changes at every level of the tree - all the way up to the root, and all the the way down into the children of the modified node. This leads to more time being spent performing reflow.
- Minimize CSS rules, and remove unused CSS rules.
- If you make complex rendering changes such as animations, do so out of the flow. Use position-absolute or position-fixed to accomplish this.
- Avoid unnecessary complex CSS selectors - descendant selectors in particular - which require more CPU power to do selector matching.

Trigger only compositor properties:

- Stick to transform and opacity changes for your animations.
- Promote moving elements with will-change or translateZ.
- Avoid overusing promotion rules; layers require memory and management.
