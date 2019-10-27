# Accessing a rust crate from python

These instruction are created from
[Lin Clark Bringing Web Assembly outside the browser ](https://youtu.be/fh9WXPu0hw8?t=116)

As she is in fear of the demo gods she prerecorded the demo (a very good idea for the presentention) but making it more difficult to follow her coding. But it is possible nevertheless, all the necessary info is given I just wanted to make it even easier with these instructions and also address an issue that already arose withing less then a month.

The following instructions show how to make a rust crate callable from python, without the need of complicated glue code.

### Warning:
This is bleeding edge technology. It isn't even standardized yet. You can't just google any error message, if you encounter issues you are pretty much on your own. I will try my best to make it as easy as possible but just be aware of the nature of this work.

## Necessary installations

- Rust
- Python
- Wasmtime
- Wasm-pack
- possible other build essentials your platform currently is missing like cmake etc.

I will go through the above bullet points in detail:

#### Rust

The latest version is stronly recommended. Currently this is 1.38 but you might just go with the current version at your time.

Go to [rust-lang.org](https://www.rust-lang.org/tools/install) and follow the instructions using rustup.

After your installation succeeded use...

```
rustup update
rustup toolchain install nightly
```

...to install the latest nightly build. We will need the nightly build later for the creation of the python module. You can leave stable as your default toolchain.

#### Python

For this installation the latest python is used which is currently 3.7.4

Again goto [Python.org](https://www.python.org/) and follow their instructions.

#### Wasmtime

You will find wasmtime at [wasmtime.dev](https://rustwasm.github.io/wasm-pack/)

We use both the shell installer and the sources for ease of use. If you are compfortably with the sources Install necessary build essentials for this accordingly. I was missing cmake.

We need the sources as the folks at mozilla are not having their feet on the table all day. Within a month the demo of the video and the python module went out of tune regarding the library version. Thus we need the sources to build our python bindings.

#### Wasm-Pack

The last package we need is wasm-pack found at [rustwasm.github.io/wasm-pack](https://rustwasm.github.io/wasm-pack/)

The latest version at the time this is written is 0.8.1 but your milage may vary.

## Creating the rust code

We would like to create a library so choose a place where you would like the rust code to be living. Cargo will create the necessary files including the directory the code will live in. I will call the folder markdown-rust but name it any way you prefer to.

```
cargo new --bin markdown-rust
cd markdown-rust
```

Use you preferred IDE / editor for editing the `lib.rs` file inside the `src` folder.
Remove the pregiven content and replace it with the following:

```rust
use pulldown_cmark::{html, Parser};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn render(input: &str) -> String {
    let parser = Parser::new(input);
    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);
    return html_output
}
```

The code above wraps the parser in a simplified way to show the capabilites of the interface types. Since we are not the author of the pulldown-cmark module wrapping is or only way to add the interface types to the module.

Next we want to adopt our `Cargo.toml` file:

```toml
[package]
name = "wasi-pulldown-cmark"
version = "0.1.0"
authors = ["Your Awesome Name <yourawesome@email.tld>"]
edition = "2018"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
pulldown-cmark = "*"
wasm-bindgen = "*"

[lib]
crate-type = ["cdylib", "rlib"]
```

The package part should already be there, just add the dependencies and the crate type.

You will possibly have to enter different types under lib if you are on linux or windows. To find out what types to use, remove the lib section and just continue with the instructions. Once you compile you will hit an error message with instructions what is missing. Follow them and you will be fine.

## Compiling the rust code

Now that you have created the code and installed the necessary tools simply create the wasm binary with:

```
WASM_INTERFACE_TYPES=1; wasm-pack build --release
```

for bash compatible syntax
or for the fish shell:

```
env WASM_INTERFACE_TYPES=1 wasm-pack build --release
```

If you left the lib section empty you will be told what to add to get a working release. Follow the instructions and repeat the command.

Remember the path of your release which should be under the `pkg` directory. Ignore the package.json, it is meaningless for our context. We only care about the `.wasm` file which is here called 

## Create the python code

Create a directory for your python code, change to it and create a virtual environment inside it and activate it.

Create a python file, eg `markdown.py` with the following content:

```python
import wasmtime
import markdown

print(markdown.render('# Hello Python'))
```

Copy your `.wasm` from above into your python directory renaming it to `markdown.wasm`

We are almost set, in theory all we have to do is to install the wasmtime python module and we should be set:

```
pip install wasmtime
```

However we will run into the following error:

```
Traceback (most recent call last):
  File "markdown.py", line 2, in <module>
    import wasi_pulldown_cmark
  File "<frozen importlib._bootstrap>", line 983, in _find_and_load
  File "<frozen importlib._bootstrap>", line 967, in _find_and_load_unlocked
  File "<frozen importlib._bootstrap>", line 677, in _load_unlocked
  File ".../lib/python3.7/site-packages/wasmtime/__init__.py", line 46, in exec_module
    res = instantiate(data, imports)
Exception: version mismatch in the bindings section: wasm file has `0.5.0` and this library supports `0.4.0`
```

The python module is already outdated and there is no source available on PyPI.

To resolve this change back to the wasmtime source code you downloaded earlier. Inside the source ode there is a `misc/wasmtime-py` directory which contains instructions for building the python module in the `README.md`.

Follow their instructions to build an up to date python wasmtime module.

If you had run `pip install wasmtime` earlier you can just copy over the library to your module directory or add the newly created `build/lib` to your `PYTHONPATH`

Finally

`python markdown.py`

shoud work. 










