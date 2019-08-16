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

Next you'll need to be sure to execute `node` with experimental flags. It's
recommended to use Node.js 12+ here as well

```
$ node --experimental-modules --loader ./loader.mjs ./run.mjs
```

Here the `--experimental-modules` and `--loader` flags are combined to enable us
to provide a custom loader for wasm files which contain interface types. The
`loader.mjs` file uses the dependencies installed by `npm install` to provide a
polyfill for WebAssembly interface types that runs natively in Node.js today.

Once the environment is set up though the `run.mjs` file looks as you might
expect:

```js
import { render } from './markdown.wasm';

console.log(render("# Hello, node!"));
```
