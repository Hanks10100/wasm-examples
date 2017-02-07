function () {
  "use asm";

  function add (x, y) {
    x = x | 0;
    y = y | 0;
    return x + y | 0;
  }

  function square (x) {
    x = x | 0;
    return x * x | 0;
  }

  return {
    add: add,
    square: square
  };
}
