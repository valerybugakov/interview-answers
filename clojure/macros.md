## Explain macros

Clojure has a programmatic macro system which allows the compiler to be extended by user code. Macros can be used to define syntactic constructs which would require primitives or built-in support in other languages. Many core constructs of Clojure are not, in fact, primitives, but are normal macros.

Some macros produce simple combinations of primitive forms. For example, when combines if and do:

```clj
user=> (macroexpand '(when (pos? a) (println "positive") (/ b a)))
(if (pos? a) (do (println "positive") (/ b a)))
```

Other macros re-arrange forms in useful ways, like the -> macro, which recursively inserts each expression as the first argument of the next expression:

```clj
user=> (-> {} (assoc :a 1) (assoc :b 2))
{:b 2, :a 1}
user=> (macroexpand '(-> {} (assoc :a 1) (assoc :b 2)))
(assoc (clojure.core/-> {} (assoc :a 1)) :b 2)
```

### Special variables

Two special variables are available inside defmacro for more advanced usages:

* `&form` - the actual form (as data) that is being invoked
* `&env` - a map of local bindings at the point of macro expansion. The env map is from symbols to objects holding compiler information about that binding.

In general, Clojure macros are potentially useful for many reasons:

* Control structures - it's possible to create certain control structures using macros that can never be represented as functions. For example, you can't write if as a function, because if it was a function then it would have to evaluate all three arguments, whereas with a macro you can make it only evaluate two (the condition value and either the true or false expression)
* Compile time optimisation - sometimes you want to optimise your code based on a constant that is known or can be computed at compile time. For example, you could create a "logging" function that logs only if the code was compiled in debug mode, but creates zero overhead in the production application.
* Code generation / boilerplate elimination - if you need to produce a lot of very similar code with similar structure, then you can use macros to automatically generate these from a few parameters. If you hate boilerplate, then macros are your friends.
* Creating new syntax - if you see the need for a particular piece of syntax that would be useful (perhaps encapsulating a common pattern) then you can create a macro to implement this. Some DSLs for example can be simplified with additional syntax.
* Creating a new language with entirely new semantics (Credits to SK-Logic!) theoretically you could even go so far to create a new language using macros, which would effectively compile your new language down into Clojure. The new langauge would not even have to be Lisp-like: it could parse and compile arbitrary strings for example.

One important piece of advice is only use macros if you need them and functions won't work. Most problems can be solved with functions. Apart for the fact that macros are overkill for simple cases, functions have some intrinsic advantages: they are more flexible, can be stored in data structures, can be passed as parameters to higher order functions, are a bit easier for people to understand etc.
