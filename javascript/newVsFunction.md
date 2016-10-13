## JS: new keyword and functions

Our question is "What’s the difference between: function Person(){}, var person = new Person(), and var person = Person()?"

The first one function Person(){} defines a function. Since it’s got a capital letter at the beginning of the function name we expect that it’s a constructor.

Next var person = new Person() is one way to create new objects. Using this method person will have access to everything Person.prototype has access to, as well as any instance variables set in the Person constructor.

Finally var person = Person() is a mistake. There are ways of dealing with mistakes like this (my preference is the "use strict" method), but ultimately this should be corrected.
