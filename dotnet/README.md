# Executing WebAssembly modules with .NET

This directory shows how a WebAssembly module can be executed by a [.NET Core](https://dotnet.microsoft.com/) program.

While the Wasmtime for .NET API does not yet support the interface types proposal, this demonstrates how the [markdown WebAssembly module](https://github.com/bytecodealliance/wasmtime-demos/tree/master/markdown) can still be used from .NET.

When the Wasmtime for .NET API supports configuring Wasmtime's WASI implementation and WebAssembly interface types, this demo will be greatly simplified so that the glue code in `Allocator.cs` and `Host.cs` will no longer be necessary.

## Installing a .NET Core SDK

Install a [.NET Core SDK](https://dotnet.microsoft.com/download) (version 3.0 or later) to build this project.

## Building the WebAssembly module

If you don't have a Rust toolset install yet, use [rustup](https://rustup.rs/) to install one.

Next, install `cargo-wasi` for easy bootstrapping of targeting WebAssembly from Rust:

```bash
cargo install cargo-wasi
```

Build the `markdown` module:

```bash
cd ../markdown
cargo wasi build --release
```

Copy `markdown.wasm` to this directory:

```bash
cd ../dotnet
cp ../markdown/target/wasm32-wasi/release/markdown.wasm .
```

## Running the .NET Core example

This demo will render a hardcoded Markdown string as HTML.

To run the application:

```bash
dotnet run
```

If everything went according to plan, this should be the result:

```html
<h1>Hello, <code>.NET</code>! Welcome to <strong>WebAssembly</strong> with <a href="https://wasmtime.dev">Wasmtime</a>!</h1>
```