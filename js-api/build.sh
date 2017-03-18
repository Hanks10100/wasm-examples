#!/bin/bash

compile () {
  wast2wasm -d $1.wast -o $1.wasm
}

compile "test"

echo
echo " => done"
