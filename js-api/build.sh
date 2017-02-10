#!/bin/bash

compile () {
  wast2wasm $1.wast -o $1.wasm
}

compile "square"
