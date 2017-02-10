# Using C/C++ to Generate wasm

## Introduction

This is a very simple example of using C/C++ to generate wasm binary file.

+ `math.c`: The source file, writing in C.
+ `math.wasm`: The WebAssembly binary file.
+ `index.html`: The entry point of this example.

### Code Details

The `math.c` contains two methods: `add` and `square`.

In the `index.html`, the `loadWebAssembly` method takes a url of `.wasm` file and convert to a WebAssembly Instance.

## Preview

1. Start a web server.
2. Use the browser that supports WebAssembly to open the `index.html`.

## Develop

1. Install [Emscripten](http://emscripten.org).
3. Run `./build.sh`.

```
       Emscripten
math.c   ----->   math.wasm
```
