import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/User";
import { EasybaseProvider, useEasybase } from "easybase-react";
import ebconfig from "./ebconfig";

function Root() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </EasybaseProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
