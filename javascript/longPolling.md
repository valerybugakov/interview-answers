## Long polling

As soon as an event occurs, the server sends back the response in the suspended request and closes it, exactly like you close the output stream of a servlet response. The client then consumes the response and opens a new long-lived Ajax request to the server.

### Client side

```js
function longPolling() {
    $.getJSON('ajax', function(events) {
        processEvents(events)
        longPolling()
    })
}
longPolling()
```


### Server side

```js
function respondToClient(res, session, cnt = 0) {
    //context: res is the object we use to respond to the client
    //session: just some info about the client, irrelevant here

    //nothing to tell the client, let's long poll.
    if (nothingToSend(res, session)) {
        if (cnt < MAX_LONG_POLL_TIME) {
            //call this function in 100 ms, increase the counter
            setTimeout(function(){
              respondToClient(request_id, res, session, cnt + 1)
            }, 100)
        } else {
            closeConnection(res)
            //Counter too high.
            //we have nothing to send and we kept the connection for too long,
            //close it. The client will open another.
        }
    } else {
        sendWhatWeHave(res)
        closeConnection(res)
        //the client will consume the data we sent,
        //then quickly send another request.
    }
}
```
