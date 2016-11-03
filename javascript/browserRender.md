## How browser renders the web page?

![Render pipeline](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-full.jpg)

- **JavaScript**. Typically JavaScript is used to handle work that will result in visual changes, whether it’s jQuery’s animate function, sorting a data set, or adding DOM elements to the page. It doesn’t have to be JavaScript that triggers a visual change, though: CSS Animations, Transitions, and the Web Animations API are also commonly used.
- **Style calculations**. This is the process of figuring out which CSS rules apply to which elements based on matching selectors, for example, .headline or .nav > .nav__item. From there, once rules are known, they are applied and the final styles for each element are calculated.
- **Layout**. Once the browser knows which rules apply to an element it can begin to calculate how much space it takes up and where it is on screen. The web’s layout model means that one element can affect others, for example the width of the <body> element typically affects its children’s widths and so on all the way up and down the tree, so the process can be quite involved for the browser.
- **Paint**. Painting is the process of filling in pixels. It involves drawing out text, colors, images, borders, and shadows, essentially every visual part of the elements. The drawing is typically done onto multiple surfaces, often called layers.
- **Compositing**. Since the parts of the page were drawn into potentially multiple layers they need to be drawn to the screen in the correct order so that the page renders correctly. This is especially important for elements that overlap another, since a mistake could result in one element appearing over the top of another incorrectly.

![WebkitFlow](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/webkitflow.png)
