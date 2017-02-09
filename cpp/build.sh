#!/bin/bash

emcc math.c -Os -s WASM=1 -s SIDE_MODULE=1 -o math.wasm
