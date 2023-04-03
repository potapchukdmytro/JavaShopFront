import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {productReducer} from "../components/products/store/productReducer";
import {configureStore} from "@reduxjs/toolkit";
import {AuthReducer} from "../components/auth/authReducer";

export const rootReducer = combineReducers({
    product: productReducer,
    auth: AuthReducer
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [thunk]
});