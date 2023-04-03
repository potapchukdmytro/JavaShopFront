import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/default";
import NotFoundPage from "./components/notFound";
import ProductCreatePage from "./components/products/create";
import ProductListPage from "./components/products/list";
import ProductEditPage from "./components/products/edit";
import ProductItemPage from "./components/products/item/ProductItemPage";
import LoginPage from "./components/auth/login";
import RegisterPage from "./components/auth/register";
import AdminLayout from "./components/containers/admin";
import AdminCategoryCreatePage from "./components/admin/categories/create";
import Home from "./components/home";
import AdminHome from "./components/admin/home";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterPage/>}/>
                    <Route path="products/create" element={<ProductCreatePage/>}/>
                    <Route path="products/edit/:id" element={<ProductEditPage/>}/>
                    <Route path="products/list" element={<ProductListPage/>}/>
                    <Route path="products/view/:id" element={<ProductItemPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
                <Route path="/admin" element={<AdminLayout/>}>
                    <Route index element={<AdminHome/>}/>
                    <Route path="categories/create" element={<AdminCategoryCreatePage/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
