#!/bin/bash

compile () {
  asm2wasm $1.js | grep -v "(import \"env\"" > $1.wast
  wast2wasm $1.wast -o $1.wasm
  hexdump -ve '8/1 "%02x " "\n"' $1.wasm
}

compile "math"
