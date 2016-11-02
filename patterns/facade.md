## The Facade Pattern

When you put up a facade, you're usually creating an outward appearance which conceals a different reality. The facade pattern provides a convenient higher-level interface to a larger body of code, hiding its true underlying complexity. Think of it as simplifying the API being presented to other developers.

Facades are a structural pattern which can often be seen in JavaScript libraries and frameworks where, although an implementation may support methods with a wide range of behaviors, only a 'facade' or limited abstract of these methods is presented to the client for use.

This allows us to interact with the facade rather than the subsystem behind the scenes.

The reason the facade is of interest is because of its ability to hide implementation-specific details about a body of functionality contained in individual modules. The implementation of a module can change without the clients really even knowing about it.

By maintaining a consistent facade (simplified API), the worry about whether a module extensively uses dojo, jQuery, YUI, zepto or something else becomes significantly less important. As long as the interaction layer doesn't change, you retain the ability to switch out libraries (eg. jQuery for Dojo) at a later point without affecting the rest of the system.

Below is a very basic example of a facade in action. As you can see, our module contains a number of methods which have been privately defined. A facade is then used to supply a much simpler API to accessing these methods:

```js
var module = (function() {
    var _private = {
        i:5,
        get : function() {
            console.log('current value:' + this.i);
        },
        set : function( val ) {
            this.i = val;
        },
        run : function() {
            console.log('running');
        },
        jump: function(){
            console.log('jumping');
        }
    };
    return {
        facade : function( args ) {
            _private.set(args.val);
            _private.get();
            if ( args.run ) {
                _private.run();
            }
        }
    }
}());


module.facade({run: true, val:10});
//outputs current value: 10, running
```

And that's really it for the facade before we apply it to our architecture.

The core difference between the facade pattern and the mediator is that the facade (a structural pattern) only exposes existing functionality whilst the mediator (a behavioral pattern) can add functionality.

A facade serves as an abstraction of the application core which sits between the mediator and our modules - it should ideally be the only other part of the system modules are aware of.
The responsibilities of the abstraction include ensuring a consistent interface to these modules is available at all times.

Components are going to communicate with the mediator through the facade so it needs to be dependable. When I say 'communicate', I should clarify that as the facade is an abstraction of the mediator which will be listening out for broadcasts from modules that will be relayed back to the mediator.

In addition to providing an interface to modules, the facade also acts as a security guard, determining which parts of the application a module may access. Components only call their own methods and shouldn't be able to interface with anything they don't have permission to. For example, a module may broadcast dataValidationCompletedWriteToDB. The idea of a security check here is to ensure that the module has permissions to request database-write access. What we ideally want to avoid are issues with modules accidentally trying to do something they shouldn't be.

To review in short, the mediator remains a type of pub/sub manager but is only passed interesting messages once they've cleared permission checks by the facade.
