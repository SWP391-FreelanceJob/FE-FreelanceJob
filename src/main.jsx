import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "@/App/Store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { FirebaseAppProvider } from "reactfire";

import { firebaseConfig } from "@/App/Firebase/firebaseconfig";

import App from "./Ui/View/App";

import "./index.css";
import "notyf/notyf.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap-icons/font/bootstrap-icons.css";

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <App />
          </FirebaseAppProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
