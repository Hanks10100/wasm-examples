#!/bin/bash

emcc math.c -Os -s WASM=1 -s SIDE_MODULE=1 -o math.wasm
hexdump -ve '8/1 "%02x " "\n"' math.wasm
