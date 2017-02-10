# Using javascript API in wasm

## Introduction

This is a very simple example of using asm.js to generate wasm binary file.

+ `square.wast`: The source file, writing in s-expressions directly.
+ `square.wasm`: The WebAssembly binary file.
+ `index.html`: The entry point of this example.

### Code Details

In this example, an `importObject` was passed to `loadWebAssembly` method. In the `square.wast` it can import the `output` method and export an `print` method, moreover, the `output` method also called in `square` method.

## Preview

1. Start a web server.
2. Use the browser that supports WebAssembly to open the `index.html`.

## Develop

1. Install [WABT](https://github.com/WebAssembly/wabt).
3. Run `./build.sh`.

```
             WABT
square.wast  --->  square.wasm
```
