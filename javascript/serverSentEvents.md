## Server-sent events

Server-Sent Events is a standard (HTML5) browser API for enabling this sort of on demand server push. You can think of Server-Sent Events as taking what has been done with complex Javascript and pushing it down into the browser itself.

### Receiving events from the server
The server-sent event API is contained in the EventSource interface; to open a connection to the server to begin receiving events from it, create a new `EventSource` object specifying the URI of a script that generates the events. For example:

```js
var evtSource = new EventSource("ssedemo.php")
```

If the event generator script is hosted on a different domain a new EventSource object should be created that specifies both the URI and options dictionary. For example, assuming the client script is on example.com:

```js
var evtSource = new EventSource("//api.example.com/ssedemo.php", { withCredentials: true } )
```

Note: using `EventSource` is not supported by all browsers. (IE)
Once you've instantiated your event source, you can begin listening for messages:

```js
evtSource.onmessage = function(e) {
  var newElement = document.createElement("li");

  newElement.innerHTML = "message: " + e.data;
  eventList.appendChild(newElement);
}
```

This code listens for incoming messages (that is, notices from the server that do not have an event field on them) and appends the message text to a list in the document's HTML.

```js
You can also listen for events, using addEventListener():

evtSource.addEventListener("ping", function(e) {
  var newElement = document.createElement("li");

  var obj = JSON.parse(e.data);
  newElement.innerHTML = "ping at " + obj.time;
  eventList.appendChild(newElement);
}, false);
```

This code is similar, except that it will be called automatically whenever the server sends a message with the event field set to "ping"; it then parses the JSON in the data field and outputs that information.

### Sending events from the server
The server-side script that sends events needs to respond using the MIME type `text/event-stream`. Each notification is sent as a block of text terminated by a pair of newlines. For details on the format of the event stream, see Event stream format.

The PHP code for the example we're using here follows:

```php
date_default_timezone_set("America/New_York");
header("Content-Type: text/event-stream\n\n");

$counter = rand(1, 10);
while (1) {
  // Every second, sent a "ping" event.

  echo "event: ping\n";
  $curDate = date(DATE_ISO8601);
  echo 'data: {"time": "' . $curDate . '"}';
  echo "\n\n";

  // Send a simple message at random intervals.

  $counter--;

  if (!$counter) {
    echo 'data: This is a message at time ' . $curDate . "\n\n";
    $counter = rand(1, 10);
  }

  ob_end_flush();
  flush();
  sleep(1);
}
```

The code above generates an event every second, with the event type "ping". Each event's data is a JSON object containing the ISO 8601 timestamp corresponding to the time at which the event was generated. At random intervals, a simple message (with no event type) is sent.

### Error handling
When problems occur (such as a network timeout or issues pertaining to access control), an error event is generated. You can take action on this programmatically by  implementing the `onerror` callback on the `EventSource` object:

```js
evtSource.onerror = function(e) {
  alert("EventSource failed.");
};
```

### Closing event streams
By default, if the connection between the client and server closes, the connection is reset.
The connection is terminated with the .close() method.

```js
evtSource.close();
```

### Event stream format
The event stream is a simple stream of text data which must be encoded using `UTF-8`. Messages in the event stream are separated by a pair of newline characters. A colon as the first character of a line is in essence a comment, and is ignored.

_Note_: The comment line can be used to prevent connections from timing out; a server can send a comment periodically to keep the connection alive.
Each message consists of one or more lines of text listing the fields for that message. Each field is represented by the field name, followed by a colon, followed by the text data for that field's value.

#### Fields

The following field names are defined by the specification:

* `event`
The event's type. If this is specified, an event will be dispatched on the browser to the listener for the specified event name; the web site source code should use `addEventListener()` to listen for named events. The `onmessage` handler is called if no event name is specified for a message.
* `data`
The data field for the message. When the `EventSource` receives multiple consecutive lines that begin with `data:`, it will concatenate them, inserting a newline character between each one. Trailing newlines are removed.
* `id`
The event ID to set the `EventSource` object's last event ID value.
* `retry`
The reconnection time to use when attempting to send the event. [What code handles this?] This must be an integer, specifying the reconnection time in milliseconds. If a non-integer value is specified the field is ignored.
All other field names are ignored.

_Note_: If a line doesn't contain a colon the entire line is treated as the field name with an empty value string.

#### Examples

##### Data-only messages

In the following example, there are three messages sent. The first is just a comment, since it starts with a colon character. As mentioned previously, this can be useful as a keep-alive if messages may not be sent regularly.

The second message contains a data field with the value "some text". The third message contains a data field with the value "another message\nwith two lines". Note the newline special character in the value.

```
: this is a test stream

data: some text

data: another message
data: with two lines
```

##### Named events

This example sends some named events. Each has an event name specified by the event field, and a data field whose value is an appropriate JSON string with the data needed for the client to act on the event. The data field could, of course, have any string data; it doesn't have to be JSON.

```
event: userconnect
data: {"username": "bobby", "time": "02:33:48"}

event: usermessage
data: {"username": "bobby", "time": "02:34:11", "text": "Hi everyone."}

event: userdisconnect
data: {"username": "bobby", "time": "02:34:23"}

event: usermessage
data: {"username": "sean", "time": "02:34:36", "text": "Bye, bobby."}
```

##### Mixing and matching

You don't have to use just unnamed messages or typed events; you can mix them together in a single event stream.

```
event: userconnect
data: {"username": "bobby", "time": "02:33:48"}

data: Here's a system message of some kind that will get used
data: to accomplish some task.

event: usermessage
data: {"username": "bobby", "time": "02:34:11", "text": "Hi everyone."}
```
