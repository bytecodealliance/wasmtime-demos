// Most of this is lifted from https://nodejs.org/api/esm.html#esm_experimental_loader_hooks
import process from 'process';
import wasm_interface_types from 'wasm-interface-types';
import { promisify } from 'util';
import { readFile } from 'fs';

const baseURL = new URL(`${process.cwd()}/`, 'file://');

export async function resolve(specifier, parentModuleURL = baseURL, defaultResolver) {
  // We're only dealing with modules that end with `.wasm`, otherwise handle
  // this require like we would any other.
  if (specifier.endsWith(".wasm")) {
    return {
      url: new URL(specifier, parentModuleURL).href,
      format: 'dynamic',
    };
  } else {
    return await defaultResolver(specifier, parentModuleURL.toString());
  }
}

const readFileAsync = promisify(readFile);

// Dynamically instantiates a wasm module with interface types included after
// processing it with `wasm-interface-types`. Note that this executes
// `wasm-interface-types` in Node itself (which is itself WebAssembly).
export async function dynamicInstantiate(url) {
  const wasmBytes = await readFileAsync(new URL(url).pathname);
  const wasm = await wasm_interface_types.process(wasmBytes);

  return {
    exports: Object.keys(wasm),
    execute: exports => {
      for (const key in wasm) {
        exports[key].set(wasm[key]);
      }
    },
  }
}
