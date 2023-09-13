import React from "react";
import "../src/";
import { HashRouter } from "react-router-dom";
import { RouterContent } from "./router";
import { KeepAliveProvider } from "keepalive-react-component";
export default function App() {
  return (
    <div className="App" style={{ height: "100%", width: "100%" }}>
      <HashRouter>
        <KeepAliveProvider>
          <RouterContent />
        </KeepAliveProvider>
      </HashRouter>
    </div>
  );
}
