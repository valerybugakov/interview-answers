## What is browser repaint?

A repaint occurs when changes are made to elements that affect visibility but not the layout. For example, opacity, background-color, visibility, and outline. Repaints are expensive because the browser must check the visibility of all other nodes in the DOM — one or more may have become visible beneath the changed element.

Repaint is browser-blocking; neither the user or your application can perform other tasks during the time that a repaint occurring. In extreme cases, a CSS effect could lead to slower JavaScript execution. This is one of the reasons you encounter issues such as jerky scrolling and unresponsive interfaces.
