import React from "react";
import "../src/";
import { HashRouter } from "react-router-dom";
import { RouterContent } from "./router";

export default function App() {
  return (
    <div className="App">
      <HashRouter>
        <RouterContent />
      </HashRouter>
    </div>
  );
}
