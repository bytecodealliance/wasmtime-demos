# WebAssembly Markdown renderer

This folder contains a Rust project which compiles to a WebAssembly file that
exports one function, `render`, which renders the input as markdown.

## Building

To build this example, first you'll want to [install
`wasm-pack`](https://rustwasm.github.io/wasm-pack/installer/). Once you've got
that installed you can execute the following (sh) commands:

```
$ export WASM_INTERFACE_TYPES=1
$ wasm-pack build
```

Note that the `WASM_INTERFACE_TYPES=1` environment variable is currently
required because the interface types section is experimental and not officially
supported yet. The [corresponding
standard](https://github.com/webassembly/webidl-bindings) is under active
development!
