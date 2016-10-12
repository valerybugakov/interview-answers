## Explain what is margin collapsing

Top and bottom margins of blocks are sometimes combined (collapsed) into a single margin whose size is the largest of the margins combined into it, a behavior known as margin collapsing.

Margin collapsing occurs in three basic cases:

1. Adjacent siblings

  The margins of adjacent siblings are collapsed (except when the later sibling needs to be cleared past floats). For example:
```html
<p>The bottom margin of this paragraph is collapsed...</p>
<p>...with the top margin of this paragraph.</p>
```
2. Parent and first/last child

  If there is no border, padding, inline content, or clearance to separate the margin-top of a block from the margin-top of its first child block, or no border, padding, inline content, height, min-height, or max-height to separate the margin-bottom of a block from the margin-bottom of its last child, then those margins collapse. The collapsed margin ends up outside the parent.
3. Empty blocks

  If there is no border, padding, inline content, height, or min-height to separate a block's margin-top from its margin-bottom, then its top and bottom margins collapse.

More complex margin collapsing (of more than two margins) occurs when these cases are combined.

These rules apply even to margins that are zero, so the margin of a first/last child ends up outside its parent (according to the rules above) whether or not the parent's margin is zero.

When negative margins are involved, the size of the collapsed margin is the sum of the largest positive margin and the smallest (most negative) negative margin.

Margins of floating and absolutely positioned elements never collapse.
