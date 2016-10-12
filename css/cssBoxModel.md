## Explain what is CSS: the box model

In a document, each element is represented as a rectangular box. Determining the size, properties — like its color, background, borders aspect — and the position of these boxes is the goal of the rendering engine.

In CSS, each of these rectangular boxes is described using the standard box model. This model describes the content of the space taken by an element. Each box has four edges: the margin edge, border edge, padding edge, and content edge.

oThe content area is the area containing the real content of the element. It often has a background, a color or an image (in that order, an opaque image hiding the background color) and is located inside the content edge; its dimensions are the content width, or content-box width, and the content height, or content-box height.

If the CSS box-sizing property is set to default, the CSS properties width, min-width, max-width, height, min-height and max-height control the content size.

The padding area extends to the border surrounding the padding. When the content area has a background, color, or image set on it, this will extend into the padding, which is why you can think of the padding as extending the content. The padding is located inside the padding edge, and its dimensions are the padding-box width and the padding-box height.

The space between the padding and the content edge can be controlled using the padding-top, padding-right, padding-bottom, padding-left and the shorthand padding CSS properties.

The border area extends the padding area to the area containing the borders. It is the area inside the border edge, and its dimensions are the border-box width and the border-box height. This area depends on the size of the border that is defined by the border-width property or the shorthand border.

The margin area extends the border area with an empty area used to separate the element from its neighbors. It is the area inside the margin edge, and its dimensions are the margin-box width and the margin-box height.

The size of the margin area is controlled using the margin-top, margin-right, margin-bottom, margin-left and the shorthand margin CSS properties.

When margin collapsing happens, the margin area is not clearly defined since margins are shared between boxes.

Finally, note that, for non-replaced inline elements, the amount of space taken up (the contribution to the height of the line) is determined by the line-height property, even though the border and padding appear visually around the content.
