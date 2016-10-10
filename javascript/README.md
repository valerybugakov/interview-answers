# Javascript Q&As

## What is event delegation?

Event delegation allows you to avoid adding event listeners to specific nodes. Instead, the event listener is added to one parent. That event listener analyzes bubbled events to find a match on child elements.

Event delegation makes use of two features of JavaScript events: *event bubbling* and the *target element*. When an event is triggered on an element, the same event is also triggered on all of that element’s ancestors. This process is known as event bubbling; the event bubbles up from the originating element to the top of the DOM tree. The original target element of any event is stored in a property of the event object - `event.target`. Using event delegation it’s possible to add an event handler to a parent element, wait for an event to bubble up from a child element and easily determine from which element the event originated.

```js
function handleMenuItemClick(e = window.event) {
  const target = e.target || e.srcElement

  if (target.tagName.toLowerCase() === 'li') {
    // do stuff...
  }
}

document.getElementById('menu').addEventListener('click', handleMenuItemClick)
```

Pros:

- There are less event handlers to setup and reside in memory. This is the big one; better performance and less crashing.
- There’s no need to re-attach handlers after a DOM update. If your page content is generated dynamically you don’t need to add and remove event handlers as elements are loaded or unloaded.

Cons:

- There’s a risk your event management code could become a performance bottleneck, so keep it as lean as possible.
- Not all events bubble. The `blur`, `focus`, `load` and `unload` events don’t bubble like other events. The blur and focus events can actually be accessed using the capturing phase (in browsers other than IE) instead of the bubbling phase but that’s a story for another day.
- You need caution when managing some mouse events. If your code is handling the mousemove event you are in serious risk of creating a performance bottleneck because the mousemove event is triggered so often.

## What's the difference between `.call` and `.apply`?
The difference is that `apply` lets you invoke the function with arguments as an array; 
`call` requires the parameters to be listed explicitly. A useful mnemonic is "A for array and C for comma."
