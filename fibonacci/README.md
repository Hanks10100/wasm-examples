# Performance Test (by fibonacci)

## Introduction

Compare the performance between asm.js and WebAssembly.

+ `fib.js`: The source file, writing in asm.js.
+ `fib.wast`: The s-expressions [text format](http://webassembly.org/docs/text-format/) of WebAssembly.
+ `fib.wasm`: The WebAssembly binary file.
+ `index.html`: The entry point of this example.

### Code Details

## Preview

1. Start a web server.
2. Use the browser that supports WebAssembly to open the `index.html`.

## Develop

1. Install [Binaryen](https://github.com/WebAssembly/binaryen).
1. Install [WABT](https://github.com/WebAssembly/wabt).
3. Run `./build.sh`.

```
        Binaryen             WABT
math.js   --->   math.wast   --->   math.wasm
```
