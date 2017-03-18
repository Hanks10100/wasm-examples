#!/bin/bash

emcc matrix.c -Os -s WASM=1 -s SIDE_MODULE=1 -o matrix.wasm

echo
echo " => done"
