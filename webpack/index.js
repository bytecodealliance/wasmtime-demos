async function run() {
  const { render } = await import("./markdown.wasm");
  const input = document.getElementById('input');
  const output = document.getElementById('output');

  function rerender() {
    output.innerHTML = render(input.value);
  }

  input.addEventListener('keyup', rerender);
  rerender();
}
run();
