import React from 'react';
import './App.css';
import Home from "./components/home";
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/default";
import Login from "./components/login";
import NotFoundPage from "./components/notFound";
import CategoryCreatePage from "./components/categories/create";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="categories/create" element={<CategoryCreatePage/>}/>;
                <Route path="*" element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
