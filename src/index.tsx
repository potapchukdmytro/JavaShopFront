import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider, useDispatch} from "react-redux";
import {store} from "./store";
import jwtDecode from "jwt-decode";
import {AuthUserActionType, IUser} from "./components/auth/types";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

if (localStorage.token) {
    const { token } = localStorage;
    const user = jwtDecode(token) as IUser;
    store.dispatch({
        type: AuthUserActionType.LOGIN_USER,
        payload: user,
    });
}

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
