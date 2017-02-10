# Use multiple wasm files

## Introduction

This example has two `.wasm` binary files.

## Preview

1. Start a web server.
2. Use the browser that supports WebAssembly to open the `index.html`.

## Develop

1. Install [Binaryen](https://github.com/WebAssembly/binaryen).
1. Install [WABT](https://github.com/WebAssembly/wabt).
3. Run `./build.sh`.

```
         Binaryen             WABT
inc.js     --->   inc.wast    --->   inc.wasm
squire.js  --->  squire.wast  --->  squire.wasm
```
