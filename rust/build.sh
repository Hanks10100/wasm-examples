#!/bin/bash

emcc math.rs -s WASM=1 -s SIDE_MODULE=1 -o math.wasm
