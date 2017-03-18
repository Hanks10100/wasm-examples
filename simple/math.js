function () {
  "use asm";

  function square (x) {
    x = x | 0;
    return x * x | 0;
  }

  return {
    square: square
  }
}
