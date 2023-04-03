import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store";
import {AuthUserToken} from "./components/auth/actions";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

if (localStorage.token) {
    const {token} = localStorage;
    AuthUserToken(token, store.dispatch);
}

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

reportWebVitals();
