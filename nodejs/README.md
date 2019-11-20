# Executing WebAssembly files with interface types in Node.js

This directory shows how a raw WebAssembly file with a custom interface types
section can be executed natively in Node.js. Node does not today support the
[interface types proposal](https://github.com/webassembly/webidl-bindings) due
to how experimental it is, so some extra support is necessary to get this
running.

## Running the example

First you'll want to build the [`markdown.wasm` example file](../markdown) and
copy it in to this directory.

Next you'll want to install necessary dependencies:

```
$ npm install
```

Next you'll need to be sure to execute `node` with experimental flags. It
requires Node.js 13+ here as well

```
$ node --experimental-wasm-mv --experimental-modules --loader ./loader.mjs ./run.mjs
```

Note that Node.js 13 with the `--experimental-wasm-mv` flag is required to
enable the multi-value support needed by the polyfill.

## How does it work?

Here the `--experimental-modules` and `--loader` flags are combined to enable us
to provide a custom loader for wasm files which contain interface types. The
`loader.mjs` file uses the dependencies installed by `npm install` to provide a
polyfill for WebAssembly interface types that runs natively in Node.js today.

The dependency that we're using here is
[`wasm-interface-types`](https://www.npmjs.com/package/wasm-interface-types)
which is a version of [`wasm-bindgen`](https://github.com/rustwasm/wasm-bindgen)
compiled to WebAssembly. This allows us to hook into imports performed by
Node.js and whenever a wasm file with WebAssembly interface types is imported we
execute `wasm-bindgen` at that time, producing a module that is compatible with
what Node.js supports today and can execute in today's environment.
