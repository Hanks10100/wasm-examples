#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int square (int x) {
  return x * x;
}
