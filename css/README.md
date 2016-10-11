# CSS Q&As

## What is the difference between classes and IDs in CSS?

`id`s are unique
* Each element can have only one id
* Each page can have only one element with that id

`class`es are NOT unique
* You can use the same class on multiple elements.
* You can use multiple classes on the same element.

Ids take precedence over classes in CSS.

## What's the difference between "resetting" and "normalizing" CSS? Which would you choose, and why?
Resetting CSS means getting rid of all styling, and normalizing CSS means making sure the styling is consistent across browsers.
Normalizing corrects some common bugs that are out of scope for resetetting.

There will be soon an `all` shorthand property that resets all properties, apart from `unicode-bidi` and `direction`, to their `initial` or `inherited` value.
While there is not it is better to use normalization.

## Describe z-index and how stacking context is formed.
A stacking context is formed, anywhere in the document, by any element which is either

* the root element (HTML),
* positioned (absolutely or relatively) with a z-index value other than "auto",
* a flex item with a z-index value other than "auto", that is the parent element display: flex|inline-flex,
* elements with an `opacity` value less than `1`,
* elements with a `transform` value other than `none`,
* elements with a `mix-blend-mode` value other than `normal`,
* elements with a `filter` value other than `none`,
* elements with a `perspective` value other than `none`,
* elements with `isolation` set to `isolate`,
* `position: fixed`
* specifying any attribute above in will-change even if you don't specify values for these attributes directly
* elements with `-webkit-overflow-scrolling` set to `touch`

Within a stacking context, child elements are stacked according to the same rules previously explained. Importantly, the z-index values of its child stacking contexts only have meaning in this parent. Stacking contexts are treated atomically as a single unit in the parent stacking context.

In summary:

* Positioning and assigning a z-index value to an HTML element creates a stacking context, (as does assigning non-full opacity).
* Stacking contexts can be contained in other stacking contexts, and together create a hierarchy of stacking contexts.
* Each stacking context is completely independent from its siblings: only descendant elements are considered when stacking is processed.
* Each stacking context is self-contained: after the element's contents are stacked, the whole element is considered in the stacking order of the parent stacking context.

When no element has a z-index, elements are stacked in this order (from bottom to top):

1. Background and borders of the root element
2. Descendant blocks in the normal flow, in order of appearance (in HTML)
3. Descendant positioned elements, in order of appearance (in HTML)

If you want to specify a different stacking order, you have to position an element and use the `z-index` property.


