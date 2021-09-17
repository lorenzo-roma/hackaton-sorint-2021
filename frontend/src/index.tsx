import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./stores/store";

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
