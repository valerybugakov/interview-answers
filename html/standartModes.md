## What's the difference between full standards mode, almost standards mode and quirks mode?

In the old days of the web, pages were typically written in two versions: One for Netscape Navigator, and one for Microsoft Internet Explorer. When the web standards were made at W3C, browsers could not just start using them, as doing so would break most existing sites on the web. Browsers therefore introduced two modes to treat new standards compliant sites differently from old legacy sites.

There are now three modes used by the layout engines in web browsers: quirks mode, almost standards mode, and full standards mode. In quirks mode, layout emulates nonstandard behavior in Navigator 4 and Internet Explorer 5. This is essential in order to support websites that were built before the widespread adoption of web standards.

### Full standards mode

In standards-compliant mode, the web browser assumes the page has been authored to the web content specification declared; code that does not conform to the declared standard may not display, or may display incorrectly.
For a web browser’s standards-compliant mode to be triggered, the webpage must have a complete document type declaration, including the URI to the document type definition (DTD).

### Almost strict mode

"Almost standards" rendering mode is exactly the same as "standards" mode in all details save one, where it works like "quirks" mode: the height calculations for line boxes and some of the inline elements in them.

In the early days, experiments with strict mode invariably raised the comment that images suddenly got an odd bottom margin that couldn’t be removed. The cause was that in strict mode <img /> is an inline element, which means that some space should be reserved for possible descender characters like g, j, or q. Of course an image doesn’t have descender characters, so the space was never used, but it still had to be reserved.

The solution was to explicitly declare images block level elements: img {display: block}.

Nonetheless browser vendors, Mozilla especially, thought this was such a confusing situation that they introduced "almost strict mode". This was defined as strict mode, but with images continuing to be blocks, and not inline elements.

### Quirks mode

In quirks mode, the web browser attempts to render code based on a ‘best-guess’, this includes a generous interpretation of code that may be non-standard or poorly-formed.

For HTML documents, browsers use a DOCTYPE in the beginning of the document to decide whether to handle it in quirks mode or standards mode. To ensure that your page uses full standards mode, make sure that your page has a DOCTYPE like in this example:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset=UTF-8>
    <title>Hello World!</title>
  </head>
  <body>
  </body>
</html>
```
