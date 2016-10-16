## Explain how JSONP works (and how it's not really Ajax).

Stands for JavaScript Object Notation with Padding

Browsers try to be security conscious. They don’t let your JS talk to just any old server (see Cross Site Scripting). When you make AJAX requests, you can only query your server, not anyone else’s. This is a problem if you want to get data from another server (perhaps see a stream of Tweets). The browsers will not let you make an AJAX call to another server, so you're stuck.

Well, browsers have a caveat. You aren’t allowed to call other servers from your JS, but you are allowed to include a script from another server. You probably already do this with jQuery. Most people include a script tag to get jQuery hosted from Google rather than hosting it themselves. Something like this:

`<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>`
Notice that the domain is ajax.googleapis.com not your-awesome-site.com. Browsers allow this kind of code sharing, but direct calls to an API from JS.

So way back in 2005 someone had the clever idea to take advantage of this caveat. Instead of calling an API directly (which browsers don’t allow) you can call it via a script tag (which is totally legit).

So how does it work?

Create a function in the global space to handle the JSON returned from the API. It doesn’t have to do much, just enough so you can see what you're getting:

```js
function myCallbackFunction(data) {
  console.log(data);
}
```

Next, add a script tag to your page which calls the API and passes it an additional parameter. Something like this:

`<script src="http://cool-stuff.com/api.json?callback=myCallbackFunction"></script>`
Notice the additional parameter? It’s typically called callback, but not always, check the docs for your particular API. Also note the callback parameter’s value. It’s the same as the function we defined earlier. This is crucial! If those names don’t match up you won’t get your data.

An API that’s set up to handle JSONP knows to look for that special parameter. If it’s there, the response isn’t just JSON, but the JSON wrapped (Padded) with the name of the callback. So for us, the API would return:

```js
myCallbackFunction({'awesome': 'data'});
```

Since the API returns to a script tag the JS is immediately executed. So myCallbackFunction gets called. We defined this function earlier, so we'll have `{'awesome': 'data'}` logged to the console!

A few things to note:

Generally you don’t write the script tag yourself. You can get jQuery to do that for you :) To make the same call as we did previously you can just use:

```js
$.ajax({
  url: 'http://cool-stuff.com/api.json',
  dataType: 'jsonp',
  success: function(data) {
    console.log(data);
  }
});
```

Safety First! There’s a reason browsers don’t like you talking to other servers - you never know what those servers will send back! Use good data validation, even if the data is “safe.”

You can only use JSONP for get requests. You can use normal AJAX to do post and delete and all data manipulations, but you cannot do this with JSONP. The practical reason for this is that HTML tags only ever get information, they can’t do anything else (think image tags, links for style sheets, and script tags). The handy reason is that if you owned the API you almost certainly would not want randoms from the internet updating your data.
