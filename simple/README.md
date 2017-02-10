# Using asm.js to Generate wasm

## Introduction

This is a very simple example of using asm.js to generate wasm binary file.

+ `math.js`: The source file, writing in asm.js.
+ `math.wast`: The s-expressions [text format](http://webassembly.org/docs/text-format/) of WebAssembly.
+ `math.wasm`: The WebAssembly binary file.
+ `index.html`: The entry point of this example.

### Code Details

The `math.js` exports two methods: `add` and `square`.

In the `index.html`, the `loadWebAssembly` method takes a url of `.wasm` file and convert to a WebAssembly Instance.

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
