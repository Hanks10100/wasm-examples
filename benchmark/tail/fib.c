int fibonacci (int n, int a, int b) {
    if (n <= 2) {
        return b;
    }
    return fibonacci(n - 1, b, a + b);
}

int fib (int n) {
  return fibonacci(n, 1, 1);
}
