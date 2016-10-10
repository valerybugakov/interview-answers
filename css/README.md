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
