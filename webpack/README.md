# Executing WebAssembly files with interface types on the web

This directory shows how a raw WebAssembly file with a custom interface types
section can be executed natively in a web browser. Browsers does not today
support the [interface types
proposal](https://github.com/webassembly/webidl-bindings) due to how
experimental it is, so we'll be using [Webpack](https://webpack.js.org/) to
compile the WebAssembly file into a form that's suitable for usage on the Web
today.

## Running the example

First you'll want to build the [`markdown.wasm` example file](../markdown) and
copy it in to this directory.

Next you'll want to install necessary dependencies:

```
$ npm install
```

And finally we'll want to start up a webpack development server:

```
$ npm start
```

After this you can visit http://localhost:8080 and you should see an interactive
markdown renderer!

> **Note**: At the time of this writing only Chrome has support for multi-value,
> and it has to be enabled by activating the "Experimental WebAssembly" setting
> under `chrome://flags`

## How does it work?

Support for this example is provided through a Webpack loader called
[`wasm-interface-types-loader`](https://www.npmjs.com/package/wasm-interface-types-loader).
That package in turn depends on
[`wasm-interface-types`](https://www.npmjs.com/package/wasm-interface-types)
which is a version of [`wasm-bindgen`](https://github.com/rustwasm/wasm-bindgen)
compiled to WebAssembly. Although it's a deep rabbit-hole it basically means
that the `wasm-bindgen` project is being executed at compile time when you build
the wepback output.

The `wasm-bindgen` project takes as input the WebAssembly module with wasm
interface types and generates some JS glue as well as a new WebAssembly without
wasm interface types which is capable of being run in a browser. These are all
assembled together to look like the same ES module that the original wasm file
exported, and then Webpack takes care of the rest!
