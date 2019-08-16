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

## How does it work?

All the magic here happens in the `wasmtime` Python extension. This python
extension [lives in the wasmtime
repository](https://github.com/cranestation/wasmtime) and is sort of like a
compiled version of the `wasmtime` executable, only tailored for Python. The
`wasmtime` Python extension uses Python's `importlib` library to inject support
to load a WebAssembly module as a Python file.

The Python extension then has all the necessary support to connect the various
dots to ensure that the WebAssembly interface types used by the wasm module are
connected to Python's own native types, and you can call the functions just as
if they were normal Python functions.
