function () {
  "use asm";

  function fib (n) {
    n = n | 0;
    if (n < 2) {
      return 1;
    }
    return (fib(n - 2) | 0) + (fib(n - 1) | 0) | 0;
  }

  return { fib: fib };
}
