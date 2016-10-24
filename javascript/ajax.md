## Explain AJAX in as much detail as possible

AJAX stands for Asynchronous JavaScript and XML. In a nutshell, it is the use of the XMLHttpRequest object to communicate with server-side scripts. It can send as well as receive information in a variety of formats, including JSON, XML, HTML, and even text files. AJAX’s most appealing characteristic, however, is its "asynchronous" nature, which means it can do all of this without having to refresh the page. This lets you update portions of a page based upon user events.

The two major features of AJAX allow you to do the following:

- Make requests to the server without reloading the page
- Receive and work with data from the server

### How it works

1. A user interaction in the browser triggers the event, such as a button click

2. The AJAX call fires. This creates and AJAX request, browsers use the XMLHttpRequest object. When the server responds to the browser’s request, the same XMLHttpRequest object will process the result.

3. The server-side script receives the input from JavaScript, and processes the data.

4. After the data is processed, the script sends the data back to the original client-side page that made the request via XML

5. Once the data is received, a second JavaScript callback function, is called this function captures the data, and updates the web page accordingly.

```html
<span id="ajaxButton" style="cursor: pointer; text-decoration: underline">
  Make a request
</span>
<script type="text/javascript">
(function() {
  var httpRequest
  document.getElementById("ajaxButton").onclick = () => makeRequest('test.html')

  function makeRequest(url) {
    httpRequest = new XMLHttpRequest()

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance')
      return false
    }
    
    httpRequest.onreadystatechange = alertContents
    httpRequest.open('GET', url)
    httpRequest.send()
  }

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText)
      } else {
        alert('There was a problem with the request.')
      }
    }
  }
})()
</script>
```
