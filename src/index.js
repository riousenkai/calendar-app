import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/User";
import { EasybaseProvider } from "easybase-react";
import ebconfig from "./ebconfig";

function Root() {
  return (
    <BrowserRouter>
      <EasybaseProvider ebconfig={ebconfig}>
        <UserProvider>
          <App />
        </UserProvider>
      </EasybaseProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
