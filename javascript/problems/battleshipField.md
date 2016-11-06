## Battleship field validator

Write a method that takes a field for well-known board game "Battleship" as an argument and returns true if it has a valid disposition of ships, false otherwise. Argument is guaranteed to be 10*10 two-dimension array. Elements in the array are numbers, 0 if the cell is free and 1 if occupied by ship.

Battleship (also Battleships or Sea Battle) is a guessing game for two players. Each player has a 10x10 grid containing several "ships" and objective is to destroy enemy's forces by targetting individual cells on his field. The ship occupies one or more cells in the grid. Size and number of ships may differ from version to version. In this kata we will use Soviet/Russian version of the game.


Before the game begins, players set up the board and place the ships accordingly to the following rules:
* There must be single battleship (size of 4 cells), 2 cruisers (size 3), 3 destroyers (size 2) and 4 submarines (size 1). Any additional ships are not allowed, as well as missing ships.
* Each ship must be a straight line, except for submarines, which are just single cell.
* The ship cannot overlap or be in contact with any other ship, neither by edge nor by corner.

### Solution

```js
function validateBattlefield(field) {
  let m = 0, n = 0;
  let k = 0;
  const ships = [Infinity, 3, 2, 1]
  maxShip = () => ships.filter(ship=>ship).length
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {

      if (!field[j][i] || j == 9) {
        if (n != 0) {
          if (maxShip() < n) return false
          ships[n - 1]--
          n = 0
        }
      } else {
        n++
        if (n > maxShip) {
          return false
        }
      }
      if (!field[i][j] || i == 9) {
        if (m != 0) {
          if (maxShip() < m) return false
          ships[m - 1]--
          m = 0
        }
      } else {
        try {
          if (m > maxShip || !!field[i + 1][j + 1] || !!field[i + 1][j - 1]) {
            return false
          }
        } catch(e) {}
        m++
        k++
      }
    }
  }
  return k === 4 + 3 * 2 + 2 * 3 + 4 && maxShip() == 1
}
```

### Nicer

```js
function validateBattlefield(field) {
  var hit = (row, col) => (row < 0 || col < 0 || row > 9 || col > 9) ? 0 : field[row][col];
  for (var ships = [10,0,0,0,0], row = 0; row < 10; row++) {
    for (var col = 0; col < 10; col++) {
      if ( hit(row,col) ) {
        if ( hit(row-1, col-1) || hit(row-1, col+1) ) return false; // Corner is touching
        if ( hit(row-1, col  ) && hit(row  , col-1) ) return false; // Side is touching
        if ( ( field[row][col] += hit(row-1, col) + hit(row, col-1) ) > 4 ) return false; // Ship is too long
        ships[field[row][col]]++; ships[field[row][col] - 1]--;
  } } }
  return [0,4,3,2,1].every((s,i) => s == ships[i]);
}
```

### Shorter

```js
function validateBattlefield(field) {
  var s = "000000000000", f = s + field.join("0").replace(/,/g, "") + s;
  var ships = "4321", h = "0(?=00........010........000)", v = h + "|" + h;
  if (/1.{9}(..)?1/.test(f)) return false;
  for (var i = 0; i < 10; ++ i) {
    if (f.split(new RegExp(v)).length != -~ships[i]) return false;
    v = v.replace(/([01])(0)(\.|(?=\)))(?=.*\|)|(01+0\.+)(?!.*1)/g, "$1$1$2$4$4");
  }
  return true;
}
```
