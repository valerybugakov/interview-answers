## What is event bubbling and capturing?

![alt tag](https://www.w3.org/TR/DOM-Level-3-Events/images/eventflow.svg)

Event objects are dispatched to an event target. But before dispatch can begin, the event object’s propagation path must first be determined.

The propagation path is an ordered list of current event targets through which the event passes. This propagation path reflects the hierarchical tree structure of the document. The last item in the list is the event target, and the preceding items in the list are referred to as the target’s ancestors, with the immediately preceding item as the target’s parent.

Once the propagation path has been determined, the event object passes through one or more event phases. There are three event phases: capture phase, target phase and bubble phase. Event objects complete these phases as described below. A phase will be skipped if it is not supported, or if the event object’s propagation has been stopped. For example, if the `bubbles` attribute is set to false, the bubble phase will be skipped, and if `stopPropagation()` has been called prior to the dispatch, all phases will be skipped.

- **The capture phase**: The event object propagates through the target’s ancestors from the Window to the target’s parent. This phase is also known as the capturing phase.

- **The target phase**: The event object arrives at the event object’s event target. This phase is also known as the at-target phase. If the event type indicates that the event doesn’t bubble, then the event object will halt after completion of this phase.

- **The bubble phase**: The event object propagates through the target’s ancestors in reverse order, starting with the target’s parent and ending with the Window. This phase is also known as the bubbling phase.

```js
element1.addEventListener('click', doSomething2, true) // captruring phase
element2.addEventListener('click', doSomething, false) // bubbling phase
```

If the user clicks on element2 the following happens:

1. The click event starts in the capturing phase. The event looks if any ancestor element of element2 has a onclick event handler for the capturing phase.

2. The event finds one on element1. `doSomething2()` is executed.

3. The event travels down to the target itself, no more event handlers for the capturing phase are found. The event moves to its bubbling phase and executes `doSomething()`, which is registered to element2 for the bubbling phase.

4. The event travels upwards again and checks if any ancestor element of the target has an event handler for the bubbling phase. This is not the case, so nothing happens.

### Stop Immediate Propagation

If several listeners are attached to the same element for the same event type, they are called in order in which they have been added. If during one such call, `event.stopImmediatePropagation()` is called, no remaining listeners will be called.
