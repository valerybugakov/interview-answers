## Explain what a single page app is and how to make one SEO-friendly.

SPA stands for Single-Page Application. When a page is loaded, you can browse other links and load new content without the need of a full page reload. Only one piece of the page is discarded and replaced by the content of the next page. With this, you will avoid requesting all JavaScript and CSS files again and rendering your header and footer HTML.

If you believe that being googleable is enough for your website, then you don't need to modify anything. Since Googlebots will execute your JavaScript, your page contents and links will be available for them.

However, Google recognizes that some JavaScript code may not be executed if its too complex or arcane. So, what you can do to help Google (and every crawler), is to add a Sitemap file named sitemap.xml at your web server root directory to tell crawlers what links do you have in your website. You can also include "invisible links", like the ones that just appears after you fill a form. You can also check [how google sees your page](https://www.google.com/webmasters/tools/googlebot-fetch).

*Note:* if you want your site to be correctly rendered in Facebook's preview or Twitter's cards, then you need to pre-render your pages. In this case, being just googleable is not enough. Another problem is that Google may index your content without parsing variables. For example, you can see things like {{ myVar }} in search results instead of the actual content.

For crawlers that aren't able to execute JavaScript code, you need to pre-render the page and make it available for them. Also, the Sitemap should be referencing those pre-rendered pages for an extra help.
