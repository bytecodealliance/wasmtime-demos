// Import our wasm file directly, which executes logic in `loader.mjs` to create
// a module which is imported here.
import { render } from './markdown.wasm';

// And that's it! Then we can start rendering markdown.
console.log(render("# Hello, node!"));
