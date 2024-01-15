import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from 'react-redux';

import { createRoot } from "react-dom/client";
import store from "./store.jsx"
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);
