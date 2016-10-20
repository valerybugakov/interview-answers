## Explain the same-origin policy with regards to JavaScript

The same-origin policy helps prevent malicious attacks by stopping code from another site executing on your site. An attacks like this is known as a Cross Site Scripting attack.

How does JS decide if it’s a “same” site?

The “origin” is the same if three things are the same: the protocol (http vs. https), the domain (subdomain.yoursite.com vs. yoursite.com vs. google.com), and the port (:80 vs. :4567). If all three of these line up, then JS views the sites as the same, and code is executed. If any of them are different then the code is marked as potentially malicious and is not run.

Hmmm, if I own “subdomain.yoursite.com” and “yoursite.com” I might want to share resources. This same-origin policy could be really annoying!

It’s possible to work around the subdomain problem. You can change the domain of a page, so it can access it’s parent’s resources:

// in the code on subdomain.yoursite.com
document.domain = "yoursite.com";
There are a couple other pieces to remember about changing the domain (mostly about the port).
