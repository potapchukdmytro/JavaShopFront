import React from 'react';
import './App.css';
import Home from "./components/home";
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/default";
import Login from "./components/login";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="login" element={<Login/>}/>
            </Route>
        </Routes>
    );
}

export default App;
