#!/bin/bash

emcc nbody.c -O3 -s WASM=1 -s SIDE_MODULE=1 -o nbody.wasm

wasm2wast nbody.wasm -o nbody.wast

echo
echo " => done"
