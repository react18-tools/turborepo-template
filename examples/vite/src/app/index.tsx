import React, { useCallback } from "react";
import "./styles.css";
import { Bars1, Bars2, Dots1, Dots2 } from "react18-loaders/dist/server";
import { LoaderContainer, useLoader } from "react18-loaders";
import { LandingPage, Layout } from "@repo/shared/dist/server";
import { Core } from "nextjs-darkmode";
import { Demo, Header } from "@repo/shared";

/** Vite App */
function App(): JSX.Element {
  const { setLoading } = useLoader();
  const handleClick = useCallback(() => setLoading(true), []);
  return (
    <Layout>
      <Core t="background .5s" />
      <Header />
      <LandingPage title="Vite Example">
        <Demo />
      </LandingPage>
      <button onClick={handleClick}>Show loader</button>
      <LoaderContainer>
        <Bars1 color="red" width={50} />
      </LoaderContainer>
    </Layout>
  );
}

export default App;
