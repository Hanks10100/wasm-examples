# WebAssembly Examples

## Background

The [MVP](http://webassembly.org/docs/mvp/) (Minimum Viable Product) doesn't support to use `<script type="module">` to require a `.wasm` file yet ([They plan to do this](http://webassembly.org/docs/modules/#integration-with-es6-modules)). The only way to access WebAssembly on the Web is through an explicit [JavaScript API](http://webassembly.org/docs/js/).

> TODO: write more.

## Getting Started

> TODO: write more.

## Examples

Each folder has a README inside. Here is an index:

+ [simple](./simple/): A simple example using asm.js.
+ [cpp](./cpp/): A simple example using C/C++.
+ [multi-wasm](./multi-wasm/): Using multiple wasm files.
+ [js-api](./js-api/): Call javascript API in wasm.
+ [nbody](./nbody/): Performance test (using C).
