## What are `data-` attributes good for?

HTML5 is designed with extensibility in mind for data that should be associated with a particular element but need not have any defined meaning. `data-*` attributes allow us to store extra information on standard, semantic HTML elements without other hacks such as non-standard attributes, extra properties on DOM, or `setUserData`.

### HTML Syntax
The syntax is simple. Any attribute on any element whose attribute name starts with `data-` is a data attribute. Say you have an article and you want to store some extra information that doesn’t have any visual representation. Just use data attributes for that:

```html
<article
  id="electriccars"
  data-columns="3"
  data-index-number="12314"
  data-parent="cars">
...
</article>
```

### JavaScript Access
Reading the values of these attributes out in JavaScript is also very simple. You could use `getAttribute()` with their full HTML name to read them, but the standard defines a simpler way: a DOMStringMap you can read out via a dataset property.

To get a data attribute through the dataset object, get the property by the part of the attribute name after `data-` (note that dashes are converted to camelCase).

```js
var article = document.getElementById('electriccars');

article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.parent // "cars"
```

Each property is a string and can be read and written. In the above case setting `article.dataset.columns = 5` would change that attribute to "5".


### CSS Access
Note that, as data attributes are plain HTML attributes, you can even access them from CSS. For example to show the parent data on the article you can use generated content in CSS with the `attr()` function:

```css
article::before {
  content: attr(data-parent);
}
You can also use the attribute selectors in CSS to change styles according to the data:

article[data-columns='3'] {
  width: 400px;
}
article[data-columns='4'] {
  width: 600px;
}
```

### Issues
Do not store content that should be visible and accessible in data attributes, because assistive technology may not access them. In addition, search crawlers may not index data attributes' values.

The main issues to consider are Internet Explorer support and performance. Internet Explorer 11+ provides support for the standard, but all earlier versions do not support `dataset`. To support IE 10 and under you need to access data attributes with `getAttribute() ` instead. Also, the performance of reading data-attributes compared to storing this data in a JS data warehouse is poor. Using `dataset` is even slower than reading the data out with `getAttribute()`.

That said, though, for custom element-associated metadata, they are a great solution.
