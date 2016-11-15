## How `WeakMap` can help you prevent memory leaks?

The experienced JavaScript programmer will notice that this API could be implemented in JavaScript with two arrays (one for keys, one for values) shared by the four API methods. Such an implementation would have two main inconveniences. The first one is an O(n) search (n being the number of keys in the map). The second one is a memory leak issue. With manually written maps, the array of keys would keep references to key objects, preventing them from being garbage collected. In native WeakMaps, references to key objects are held "weakly", which means that they do not prevent garbage collection in case there would be no other reference to the object.

Because of references being weak, WeakMap keys are not enumerable (i.e. there is no method giving you a list of the keys). If they were, the list would depend on the state of garbage collection, introducing non-determinism. If you want to have a list of keys, you should use a Map.

```js
const privateData = new WeakMap()

class MyClass {
    constructor(name, age) {
        privateData(this, { name, age })
    }

    getName() {
        return privateData.get(this).name;
    }

    getAge() {
        return privateData.get(this).age;
    }
}

export default MyClass
```

```js
const myElement = document.getElementById('logo')
const myWeakmap = new WeakMap()

myWeakmap.set(myElement, {timesClicked: 0})

myElement.addEventListener('click', () => {
  const logoData = myWeakmap.get(myElement)
  logoData.timesClicked++

  myWeakmap.set(myElement, logoData)
}, false)
```
