using System;
using System.Linq;
using Wasmtime;

namespace WasmtimeDemo
{
    class Program
    {
        const string MarkdownSource = 
            "# Hello, `.NET`! Welcome to **WebAssembly** with [Wasmtime](https://wasmtime.dev)!";

        static void Main()
        {
            using var engine = new Engine();

            using var store = engine.CreateStore();

            using var module = store.CreateModule("markdown.wasm");

            using var instance = module.Instantiate(new Host());

            var memory = instance.Externs.Memories.SingleOrDefault() ??
                throw new InvalidOperationException("Module must export a memory.");

            var allocator = new Allocator(memory, instance.Externs.Functions);

            (var inputAddress, var inputLength) = allocator.AllocateString(MarkdownSource);

            try
            {
                object[] results = (instance as dynamic).render(inputAddress, inputLength);

                var outputAddress = (int)results[0];
                var outputLength = (int)results[1];

                try
                {
                    Console.WriteLine(memory.ReadString(outputAddress, outputLength));
                }
                finally
                {
                    allocator.Free(outputAddress, outputLength);
                }
            }
            finally
            {
                allocator.Free(inputAddress, inputLength);
            }
        }
    }
}