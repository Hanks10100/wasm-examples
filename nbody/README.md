# An Benchmark Example for WebAssembly

## Introduction

The source code is from [The Computer Language Benchmarks Game](http://benchmarksgame.alioth.debian.org/).

> TODO: write more.

+ `nbody.c`: The source file, writing in C.
+ `nbody.wasm`: The WebAssembly binary file.
+ `index.html`: The entry point of this example.

## Preview

1. Start a web server.
2. Use the browser that supports WebAssembly to open the `index.html`.

## Develop

1. Install [Binaryen](https://github.com/WebAssembly/binaryen).
1. Install [WABT](https://github.com/WebAssembly/wabt).
3. Run `./build.sh`.
