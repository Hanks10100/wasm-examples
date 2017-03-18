#!/bin/bash

compile () {
  asm2wasm $1.js | grep -v "(import \"env\"" > $1.wast
  wast2wasm $1.wast -o $1.wasm
}

compile "inc"
compile "square"

echo
echo " => done"
