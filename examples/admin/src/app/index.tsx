import React from "react";
import "./styles.css";
import { Bars1, Bars2, Dots1, Dots2, useLoader } from "@repo/ui";
import { LoaderContainer } from "@repo/ui/dist/client";

function App(): JSX.Element {
  const { setLoading } = useLoader();
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
      <button onClick={() => setLoading(true)}>Show loader</button>
      <LoaderContainer>
        <Bars1 color="red" width={50} />
      </LoaderContainer>
    </div>
  );
}

export default App;
