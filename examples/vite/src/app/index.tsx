import React, { useCallback } from "react";
import "./styles.css";
import { Bars1, Bars2, Dots1, Dots2 } from "react18-loaders/dist/server";
import { LoaderContainer, useLoader } from "react18-loaders";

/** Vite App */
function App(): JSX.Element {
  const { setLoading } = useLoader();
  const handleClick = useCallback(() => setLoading(true), []);
  return (
    <div className="container">
      <h1 className="title">
        Admin <br />
        <span>Kitchen Sink</span>
      </h1>
      <Dots1 color="#00f" width={60} />
      <Dots2 color="#00f" width={50} dotRadius={8} />
      <Bars2 color="red" width={50} />
      <Bars1 color="red" width={50} />
      <button onClick={handleClick}>Show loader</button>
      <LoaderContainer>
        <Bars1 color="red" width={50} />
      </LoaderContainer>
    </div>
  );
}

export default App;
