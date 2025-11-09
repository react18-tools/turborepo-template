// biome-ignore lint/correctness/noUnusedImports: refers to UMD
import React, { type ReactNode, useCallback } from "react";
import "./styles.css";
import { Demo, Header } from "@repo/shared";
import { LandingPage, Layout } from "@repo/shared/dist/server";
import { Core } from "nextjs-darkmode";
import { LoaderContainer, useLoader } from "react18-loaders";
import { Bars1 } from "react18-loaders/server";

/** Vite App */
function App(): ReactNode {
  const { setLoading } = useLoader();
  const handleClick = useCallback(() => setLoading(true), [setLoading]);
  return (
    <Layout>
      <Core t="background .5s" />
      <Header />
      <LandingPage title="Vite Example">
        <Demo />
      </LandingPage>
      <button onClick={handleClick} type="button">
        Show loader
      </button>
      <LoaderContainer>
        <Bars1 color="red" width={50} />
      </LoaderContainer>
    </Layout>
  );
}

export default App;
