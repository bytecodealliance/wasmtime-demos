# Import our Python extension `wasmtime_py` which loads the ability to load wasm
# modules natively within Python.
import wasmtime

# Next up, loader our `markdown.wasm` file. This is loaded by the `wasmtime_py`
# extension above and hooked up into the Python module system.
import markdown

# And now we can use the markdown file!
print(markdown.render('# Hello, Python!'))
