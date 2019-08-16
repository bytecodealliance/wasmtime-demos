# Executing WebAssembly files with interface types in Node.js

This directory shows how a raw WebAssembly file with a custom interface types
section can be executed natively in Python. Python does not today support the
[interface types proposal](https://github.com/webassembly/webidl-bindings) due
to how experimental it is, but you can use the `wasmtime` Python package to add
support for this.

## Running the example

First you'll want to build the [`markdown.wasm` example file](../markdown) and
copy it in to this directory.

Next you'll want to install the `wasmtime` Python package

```
$ pip3 install wasmtime
```

And finally, execute the Python script!

```
$ python3 run.py
```
