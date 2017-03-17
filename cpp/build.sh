#!/bin/bash

emcc math.c -Os -s WASM=1 -s SIDE_MODULE=1 -o math.wasm

wasm2wast math.wasm -o math.wast
hexdump -ve '8/1 "%02x " "\n"' math.wasm
