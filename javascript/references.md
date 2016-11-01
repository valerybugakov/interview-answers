## Why is (0,obj.prop)() not a method call?

Or what's the difference between:
```js
obj.prop()
(0, obj.prop)()
```

The difference is in the call context. Consider the following examples:
```js
'use strict'

const obj = {
    getThis() {
        return this
    },
}

obj.getThis() === obj // true

const f = obj.getThis
f() // undefined
```

Same thing applies for a comma operator:
```js
(expr1, expr2) === expr2
```

That is, both expressions are evaluated, the result of the whole expression is expr2.

```js
(0, obj.getThis)() // undefined
```

We are now ready to understand the examples we looked at earlier.

The following expression produces a reference:

```js
obj.getThis
```

If you wrap obj.getThis in parentheses, nothing changes, parentheses only syntactically group things, but the don’t influence how something is evaluated. That is, the result of the following expression is still a reference:
```js
(obj.getThis)
```
If, however, you assign the reference returned by obj.getThis to a variable, the reference is dereferenced:
```js
const func = obj.getThis
```
In other words: what is stored in func is a function, not a reference.
The comma operator also dereferences its operands. Consider this expression:

```js
(0, obj.getThis)
```

That's why Babel use `(0, referenceFunction)()` syntax.
It uses the comma operator to avoid function calls being transpiled to method calls.
```js
import { func } from 'library'
    
func()
```
Babel compiles it to this ES5 code:

```js
'use strict';
    
var _library = require('library');    
(0, _library.func)(); // (A)
```
