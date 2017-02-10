function () {
  "use asm";

  function inc (x) {
    x = x | 0;
    return x + 1 | 0;
  }

  return {
    inc: inc
  };
}
