## What's the difference between host objects and native objects?

__Native object__ is an object in an ECMAScript implementation whose semantics are fully defined by this specification rather than by the host environment.

Standard native objects are defined in the specification. 
Some native objects are built-in; others may be constructed during the course of execution of an ECMAScript program.

__Host object__ is an object supplied by the host environment to complete the execution environment of ECMAScript.

There are some of them: `window, document, location, history, XMLHttpRequest, setTimeout, getElementsByTagName, querySelectorAll, ...`

Any object that is not native is a host object.

### ES6
Also, worthwhile noting that ES6 does not use the terminology native and host objects any more. 
Instead, it defines below object types, with more clear explanations of their intended behaviour.

* Ordinary object
  — object that has the default behaviour for the essential internal methods that must be supported by all objects

* Exotic object
  — object that does not have the default behaviour for one or more of the essential internal methods that must be supported by all objects NOTE Any object that is not an ordinary object is an exotic object.

* Standard object
  — object whose semantics are defined by the specification

* Built-in object
  — object specified and supplied by an ECMAScript implementation
