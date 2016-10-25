## How would you get currently focused element?

```js
var curElement = document.activeElement
```

`document.activeElement` returns the currently focused element, that is, the element that will get keystroke events if the user types any. This attribute is read only.

Often this will return an `<input>` or `<textarea>` object, if it has the text selection at the time.  If so, you can get more detail by using the element's `selectionStart` and `selectionEnd` properties.  Other times the focused element might be a `<select>` element (menu) or an `<input>` element, of type button, checkbox or radio.

**Note**: On Mac, elements that aren't text input elements tend not to get focus assigned to them.

Typically a user can press the tab key to move the focus around the page among focusable elements, and use the space bar to activate it (press a button, choose a radio).

Do not confuse focus with a selection over the document, consisting mostly of static text nodes.  See `window.getSelection()` for that.

When there is no selection, the active element is the page's `<body>` or `null`.
