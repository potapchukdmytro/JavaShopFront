import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/default";
import NotFoundPage from "./components/notFound";
import ProductListPage from "./components/products/list";
import ProductItemPage from "./components/products/item/ProductItemPage";
import LoginPage from "./components/auth/login";
import RegisterPage from "./components/auth/register";
import AdminLayout from "./components/containers/admin";
import AdminCategoryCreatePage from "./components/admin/categories/create";
import Home from "./components/home";
import AdminHome from "./components/admin/home";
import ProductCreatePage from "./components/admin/products/create";
import ProductEditPage from "./components/admin/products/edit";
import AdminProductListPage from "./components/admin/products/list";
import ProfilePage from "./components/profile";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterPage/>}/>
                    <Route path="products/list" element={<ProductListPage/>}/>
                    <Route path="products/view/:id" element={<ProductItemPage/>}/>
                    <Route path="profile" element={<ProfilePage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
                <Route path="/admin" element={<AdminLayout/>}>
                    <Route index element={<AdminHome/>}/>
                    <Route path="categories/create" element={<AdminCategoryCreatePage/>}/>
                    <Route path="products/list" element={<AdminProductListPage/>}/>
                    <Route path="products/create" element={<ProductCreatePage/>}/>
                    <Route path="products/edit/:id" element={<ProductEditPage/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
