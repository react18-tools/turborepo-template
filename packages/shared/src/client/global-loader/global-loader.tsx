import { LoaderContainer } from "react18-loaders";
import { Bars1 } from "react18-loaders/dist/server/bars/bars1";

/**
 * # GlobalLoader
 * LoaderContainer with a Loader.
 *
 * We can't add this directly inside layout if we want to build this shared package and use the generated code from `dist` directory.
 *
 * Why can't we do this? because doing so will add client side functionality without "use client" directive. And that will fail with Next.js
 *
 */
export function GlobalLoader() {
  return (
    <LoaderContainer>
      <Bars1 color="red" />
    </LoaderContainer>
  );
}
