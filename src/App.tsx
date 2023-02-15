import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface Category {
    id: number;
    name: string;
}

const App = () => {
    const [categories, setCategories] = useState<Array<Category>>([]);
    const listItems = categories.map((category) =>
        <li>{category.name}</li>
    );
    useEffect(() => {
        axios.get(`http://localhost:8083/api/categories`)
            .then(res => {
                setCategories(res.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    }, []);
    return (
        <>
            <h1>Categories</h1>
            <ul>{listItems}</ul>
        </>
    );
}

export default App;
