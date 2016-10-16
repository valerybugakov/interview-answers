## What's the difference between an "attribute" and a "property"?
### Attribute
1. Attributes are defined by HTML, all definitions inside HTML tag are attributes.
2. The type of attributes is always string.

### Property
1. Properties belong to DOM, the nature of DOM is an object in JavaScript. We can get and set properties as we do to a normal object in JavaScript and properties can be any types.
2. Non-custom attributes have 1:1 mapping onto properties, like: `id`, `class`, `title`, etc.
3. Non-custom property (attribute) changes when corresponding attribute (property) changes in most cases.
4. Attribute which has a default value doesn't change when corresponding property changes.

### Best Practice

It is recommended to use properties in JavaScript as it's much easier and faster. Especially for boolean type attributes like: `checked`, `disabled` and `selected`, browser automatically converts them into boolean type properties.

```html
<input id="test" class="blue" type="radio" />
```

#### Good practice

```js
// get id
document.getElementById('test').id;
// set class
document.getElementById('test').className = 'red';
// get and set radio control status
document.getElementById('test').checked;
document.getElementById('test').checked = true;
```

#### Bad practice

```js
// get id
document.getElementById('test').getAttribute('id');
// set class
document.getElementById('test').setAttribute('class', 'red');
```
