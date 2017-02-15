function () {
  "use asm";

  function fibonacci (n, a, b) {
    n = n | 0;
    a = a | 0;
    b = b | 0;
    if (n <= 2) {
      return b | 0;
    }
    return fibonacci((n - 1) | 0, b, a + b) | 0;
  }

  function fib (n) {
    n = n | 0;
    return fibonacci(n, 1, 1) | 0;
  }

  return { fib: fib };
}
