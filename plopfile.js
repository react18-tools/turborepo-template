/**
 * Generator function to add a new React component to the internal UI library.
 * @param {import('plop').NodePlopAPI} plop - Plop API.
 */
async function generator(plop) {
  const rc = await import("./scripts/rc.ts");
  const hook = await import("./scripts/hook.ts");

  plop.setGenerator("rc", rc.default);
  plop.setGenerator("hook", hook.default);
}

module.exports = generator;
