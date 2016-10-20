## What are the ways server can push data to the client?

### Comet

Traditionally, the __Comet__ term (coinded in 2006 by Alex Russell) has been referring to both HTTP Streaming and HTTP Polling. But consider that the first implementations of HTTP Streaming go back to 2000, well before the Comet term was coined.

__Comet__ is a set of technology principles/communication patterns that are typically implemented using HTTP long-poll. It enables a server to send data to the browser on demand (i.e. server push). Current comet implementations require some complex Javascript on the client side and support from the server-side (for long-held requests).

#### Http Polling
Basically AJAX, using XmlHttpRequest.

#### Http Long Polling
Is still AJAX but the server holds on to the response unless the server has an update, as soon as the server has an update, it sends it and then the client can send another request. Disadvantage is the additional header data that needs to be sent back and forth causing additional overhead.

#### Http Streaming
Similar to long polling but the server responds with a header with `Transfer Encoding: chunked` and hence we do not need to initiate a new request every time the server sends some data (and hence save the additional header overhead). The drawback here is that we have to "understand" and figure out the structure of the data to distinguish between multiple chunks sent by the server.

#### Java Applet, Flash, Silverlight
They provide the ability to connect to socket servers over tcp/ip but since they are plugins, developers don't want to depend on them.

--
There are also some techniques with iframes that are not worth mentioning.

### Not Comet
Basically, Comet is a term for a set of hacks to eneble server push. There are some new APIs that are not hacks:

#### WebSockets

WebSockets are the new API which tries to address the short comings of above methods in the following manner:

* The advantage of WebSockets over plugins like Java Applets, Flash or Silverlight is that WebSockets are natively built into browsers and does not rely on plugins.
* The advantage of WebSockets over http streaming is that you don't have to make an effort to "understand" and parse the data received.
* The advantage of WebSockets over Long Polling is that of elimination of extra headers size & opening and closing of socket connection for request.

#### Server-sent events
Not fully supported yet
