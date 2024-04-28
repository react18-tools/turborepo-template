import React from "react";
import "./styles.css";
import { Dots1, Dots2 } from "@repo/ui";

function App(): JSX.Element {
  return (
    <div className="container">
      <h1 className="title">
        Admin <br />
        <span>Kitchen Sink</span>
      </h1>
      <Dots1 />
      <Dots2 color="#00f" width={50} dotSize={8} />
    </div>
  );
}

export default App;
