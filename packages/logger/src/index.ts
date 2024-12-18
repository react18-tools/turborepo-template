/**
 * Logger function:
 *
 * Makes it easy to change your log target
 */
export const log = (...args: unknown[]): void => {
  console.log("LOGGER: ", ...args);
};
