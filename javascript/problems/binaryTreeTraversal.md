## Given the root node of a binary tree (but not necessarily a binary search tree,) write three functions that will print the tree in pre-order, in-order, and post-order.

A Node has the following properties:

```js
var data; // A number or string.
Node left; // Undefined if there is no left child.
Node right; // Undefined if there is no right child.
```

The structure of a tree looks like:

```js
data Tree a = Nil | Node (Tree a) a (Tree a)
```

Pre-order means that we

1. Visit the root.
2. Traverse the left subtree (left node.)
3. Traverse the right subtree (right node.)

In-order means that we

1. Traverse the left subtree (left node.)
2. Visit the root.
3. Traverse the right subtree (right node.)

Post-order means that we

1. Traverse the left subtree (left node.)
2. Traverse the right subtree (right node.)
3. Visit the root.

Let's say we have three Nodes.

```js
var a = new Node("A");
var b = new Node("B");
var c = new Node("C");

a.left = b;
a.right = c;
```

Then, preOrder(a) should return `["A", "B", C"]`
inOrder(a) should return `["B", "A", "C"]`
postOrder(a) should return `["B", "C", A"]`

What would happen if we did this?

```js
var d = new Node("D");
c.left = d;
```

preOrder(a) should return `["A", "B", "C", "D"]`
inOrder(a) should return `["B", "A", "D", "C"]`
postOrder(a) should return `["B", "D", "C", "A"]`

## Solution
```js
const toArray = (node, f) => node ? f(node) : []

// 1.) Root node, 2.) traverse left subtree, 3.) traverse right subtree.
function preOrder(node)
{
  return [
    node.data,
    ...toArray(node.left, preOrder),
    ...toArray(node.right, preOrder),
  ]
}

// 1.) Traverse left subtree, 2.) root node, 3.) traverse right subtree.
function inOrder(node)
{
  return [
    ...toArray(node.left, inOrder),
    node.data,
    ...toArray(node.right, inOrder),
  ]
}

// 1.) Traverse left subtree, 2.) traverse right subtree, 3.) root node.
function postOrder(node)
{
  return [
    ...toArray(node.left, postOrder),
    ...toArray(node.right, postOrder),
    node.data,
  ]
}
```

## ES5 solution

```js
function preOrder(node) {
  return node == null || node.data == null ? [] : [node.data].concat(preOrder(node.left)).concat(preOrder(node.right));
}
function inOrder(node) {
  return node == null || node.data == null ? [] : inOrder(node.left).concat(node.data).concat(inOrder(node.right));
}
function postOrder(node) {
  return node == null || node.data == null ? [] : postOrder(node.left).concat(postOrder(node.right)).concat(node.data);
}
```
