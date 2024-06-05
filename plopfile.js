/**
 * Generator function to add a new React component to the internal UI library.
 * @param {import('plop').NodePlopAPI} plop - Plop API.
 */
function generator(plop) {
  plop.setGenerator("rc", require("./scripts/rc"));
  plop.setGenerator("hook", require("./scripts/hook"));
}

module.exports = generator;
