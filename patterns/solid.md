## SOLID

The 5 SOLID JavaScript (or any language) principles are:

S – Single Responsibility Principle
O – Open-Closed Principle
L – Liskov Substitution Principle
I – Interface Segregation Principle
D – Dependency Inversion Principle

Let’s tackle them one by one.

### 1. Single Responsibility Principle

Very similar to Unix’s “Do one thing and do it well”. This one is easy to comprehend but harder to implement.

Every function you write should do exactly one thing. It should have one clearly defined goal.

You’ll be surprised at the number of times you would like your function to do more than “one thing”.

You’ll also struggle repeatedly with defining what the “one thing” you want to do is.

Let’s say Facebook’s entire website is made up of only one function called `runFacebook(args)`. The function would still do one huge thing.

Is doing one huge thing OK? Where do we draw the line?

I have 3 strategies for dealing with this question:

If you find yourself wanting to call a function `loginUserAndGetGroups()`, you’re probably breaking the Single Responsibility Principle. Break these functions into two separate ones.
For every function you create, think if there’s a useful part which can be extracted into an even smaller function.
After you’ve created your function, scan through it again. See how many reusable functions you can extract.
There’s one catch though.

Let’s say for every user that logs in you always need to fetch their favorite music, favorite TV shows and favorite music.  We now know that you’ll want to divide them up to `getShows()`, `getMovies()` and `getMusic()` functions.

But what if those functions are almost always called together. We don’t want to create a `getShowsAndMoviesAndMusic()` function. But we also don’t want call all 3 different functions every time either.

In order to not repeat ourselves, it’s ok to create one wrapping function which encapsulates all 3. I would call it getUserMedia. This isn’t cheating as long as `getUserMedia()` is comprised out of 3 independent pure functions.

Using this logic, `runFacebook(args)` is indeed a single responsibility function. But this only applies as long as the underlying `runFacebook(args)` function implementation is also divided up correctly.

I told you this one was a little tricky.

### 2. Open-Closed Principle

Open-Closed Principle means our JavaScript modules should be open to extension, but closed to modification.

Meaning that if someone wants to extend our module’s behavior, they won’t need to modify existing code if they don’t want to.

There’s a very easy rule of thumb you can follow here. If I have to open the JS file your module and make a modification in order to extend it, you’ve failed the open closed principle.

example:

```js
var iceCreamFlavors=["chocolate","vanilla"];
var iceCreamMaker={
 makeIceCream (flavor) {
  if(iceCreamFlavors.indexOf(flavor)>-1){
   console.log("Great success. You now have ice cream.")
  }else{
   console.log("Epic fail. No ice cream for you.")
  }
 }
}
export default iceCreamMaker;
```

As you can see there’s no way to add an ice cream flavor without editing the `iceCreamFlavor` array. We can easily change that.

```js
var iceCreamFlavors=["chocolate", "vanilla"];
var iceCreamMaker={
 makeIceCream (flavor) {
  if(iceCreamFlavors.indexOf(flavor)>-1){
   console.log("Great success. You now have ice cream.")
  }else{
   console.log("Epic fail. No ice cream for you.")
  }
 }
 addFlavor(flavor){
  iceCreamFlavors.push(flavor);
 }
}
export default iceCreamMaker;
```

We can now add delicious ice cream flavors from anywhere in our code without opening the `iceCreamMaker.js` file.

Solid JavaScript indeed.

### 3. Liskov Substitution Principle

This is one of the most obscure names I’ve ever seen in the programming world.

Who is Liskov? What is she trying to substitute?

Besides naming critique there’s not much I can add to this answer.

### 4. Interface Segregation

Interface segregation refers to a time in the 60s when black interfaces could only be implemented by black classes.

Bad joke. Moving on.

Interface segregation actually means you shouldn’t create bloated interfaces. Since JavaScript doesn’t have interfaces, I’m going to use a more abstract example.

Let’s say your friend Fred created a brand new HTML5 router library. He convinced you his implementation is “Da Bomb” and you should try it.

You start playing around with it and try to register your first route. Your friend Fred tells you to call `registerRoute(routeName)` and you’re all set.

But Fred lied.

He forgot to mention that he also needs you to implement `onCloseBrowser()` and `handleIE8()` for every route you register.

You might not want to implement special behavior when the browser closes. And you’re lucky enough you don’t need to support IE8. There’s no possible reason for you to implement those behaviors.

The lesson here is whenever you expose a module for outside use, make sure only the bare essentials are required and the rest are optional.

Otherwise, your friends will hate you.

### 5. Dependency Inversion Principle

You’ve might have heard about dependency inversion before only as a different term. Dependency Injection and Inversion of Controls also mean the same thing. This is the most famous principle out of the bunch.

Dependency Injection is all about handing over control from the function itself to the caller of the function. In our case its defining who controls the type of parameters the function receives. Let’s use an example.

Fred is at it again. This he create an event emitter implementation which 0.0001 faster then anything else out there. Fred urges you to try it out.

You don’t want to offend Fred so you give it a shot. Your function looks something like this:

```js
function awesomeSauce(dispatcher){
 dispatcher.trigger("awesome/sauce");
}

function awesomeSauceListener(dispatcher){
 dispatcher.on("awesome/sauce",()=>{alert("awesome!")});
}
```

There’s one problem. Fred’s dispatcher methods are called `emit()` and `listen()`.

You could refactor your code. But what if Fred’s implementation isn’t all that great.

You’d like to be able to easily switch between implementations

You realize you don’t need the whole dispatcher object implementation in every function. You change your code to only receive the relevant methods for every function.

```js
function awesomeSauce(dispatch){
 dispatch("awesome/sauce");
}

function awesomeSauceListener(listen){
 listen("awesome/sauce",()=>{alert("awesome!")});
}
```

Your code now doesn’t depend on any concrete implementation of an event emitter object. You can now freely switch between Fred’s implementation or use a mock implementation for testing.
