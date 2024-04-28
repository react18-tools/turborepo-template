import React from "react";
import "./styles.css";
import { Bars1, Bars2, Dots1, Dots2 } from "@repo/ui";

function App(): JSX.Element {
  return (
    <div className="container">
      <h1 className="title">
        Admin <br />
        <span>Kitchen Sink</span>
      </h1>
      <Dots1 color="#00f" width={60} />
      <Dots2 color="#00f" width={50} dotSize={8} />
      <Bars2 color="red" width={50} />
    </div>
  );
}

export default App;
