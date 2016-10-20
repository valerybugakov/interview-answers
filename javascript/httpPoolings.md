## What are Long-Polling, Websockets, Server-Sent Events (SSE) and Comet?

Before you can understand these technologies, you have to understand classic HTTP web traffic first.

### Regular HTTP:

A client requests a webpage from a server.
The server calculates the response
The server sends the response to the client.

![alt tag](http://i.stack.imgur.com/TK1ZG.png)

### Ajax Polling:

A client requests a webpage from a server using regular HTTP (see HTTP above).
The requested webpage executes JavaScript which requests a file from the server at regular intervals (e.g. 0.5 seconds).
The server calculates each response and sends it back, just like normal HTTP traffic.

![alt tag](http://i.stack.imgur.com/qlMEU.png)

### Ajax Long-Polling:

A client requests a webpage from a server using regular HTTP (see HTTP above).
The requested webpage executes JavaScript which requests a file from the server.
The server does not immediately respond with the requested information but waits until there's new information available.
When there's new information available, the server responds with the new information.
The client receives the new information and immediately sends another request to the server, re-starting the process.

![alt tag](http://i.stack.imgur.com/zLnOU.png)

### HTML5 Server Sent Events (SSE) / EventSource:

A client requests a webpage from a server using regular HTTP (see HTTP above).
The requested webpage executes javascript which opens a connection to the server.
The server sends an event to the client when there's new information available.
Real-time traffic from server to client, mostly that's what you'll need
You'll want to use a server that has an event loop
Not possible to connect with a server from another domain
If you want to read more, I found these very useful: (article), (article), (article), (tutorial).

![alt tag](http://i.stack.imgur.com/ziR5h.png)

### HTML5 Websockets:

A client requests a webpage from a server using regular http (see HTTP above).
The requested webpage executes JavaScript which opens a connection with the server.
The server and the client can now send each other messages when new data (on either side) is available.
Real-time traffic from the server to the client and from the client to the server
You'll want to use a server that has an event loop
With WebSockets it is possible to connect with a server from another domain.
It is also possible to use a third party hosted websocket server, for example Pusher or others. This way you'll only have to implement the client side, which is very easy!
If you want to read more, I found these very useful: (article), (article) (tutorial).

![alt tag](http://i.stack.imgur.com/CgDlc.png)

### Comet:

Comet is a collection of techniques prior to HTML5 which use streaming and long-polling to achieve real time applications. Read more on wikipedia or this article.

Now, which one of them should I use for a realtime app (that I need to code). I have been hearing a lot about websockets (with socket.io [a node.js library]) but why not PHP ?
You can use PHP with WebSockets, check out Ratchet.
