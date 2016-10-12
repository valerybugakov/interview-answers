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

## Describe BFC(Block Formatting Context) and how it works.
A block formatting context is a part of a visual CSS rendering of a Web page. It is the region in which the layout of block boxes occurs and in which floats interact with each other.

A block formatting context is created by one of the following:

* the root element or something that contains it
* floats (elements where float is not none)
* absolutely positioned elements (elements where position is absolute or fixed)
* inline-blocks (elements with display: inline-block)
* table cells (elements with display: table-cell, which is the default for HTML table cells)
* table captions (elements with display: table-caption, which is the default for HTML table captions)
* elements where overflow has a value other than visible
* flex boxes (elements with display: flex or inline-flex)

A block formatting context contains everything inside of the element creating it that is not also inside a descendant element that creates a new block formatting context.

Block formatting contexts are important for the positioning and clearing of floats. The rules for positioning and clearing of floats apply only to things within the same block formatting context. Floats do not affect the layout of things in other block formatting contexts, and clear only clears past floats in the same block formatting context.

## What are the various clearing techniques and which is appropriate for what context?

### 1. Floating the container 
If you __float__ an element containing floats, it will encompass its content. The side-effect of this is that we add another floated element to the page, while we most of the times want it to behave as a regular block element. That is solved by applying a `width` of `100%` to the container as well, so it forces a line-break before the content after it.
 
Setting a width to 100% might collide with desired padding.
 
### 2. Adding `overflow: hidden` to the container
The easiest one. Can be used when you do not need overflow.
If you add `overflow: hidden` to the containing element, it will automatically adjust its height and take the floated children into account.

### 3. Using pseudo class
Another alternative is to use the CSS `pseudo-class: after` to generate content after the containing element, using it to clear floats and then hiding itself.

```js
.container-with-generated-content:after{
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
```
