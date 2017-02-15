#!/bin/bash

compile_js () {
  asm2wasm $1.asm.js | grep -v "(import \"env\"" > $1.wast
  wast2wasm $1.wast -o $1.wasm
}

compile_c () {
  emcc $1.c -Os -s WASM=1 -s SIDE_MODULE=1 -o $1c.wasm
  wasm2wast $1c.wasm -o $1c.wast
}


compile_js "js/fib"
compile_js "tail/fib"

compile_c "fib"
compile_c "tail/fib"
