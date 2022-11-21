import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import MemoriesContextProvider from "./data/MemoryContextProvider";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <MemoriesContextProvider>
    <App />
  </MemoriesContextProvider>
);

defineCustomElements(window);

serviceWorkerRegistration.register();
