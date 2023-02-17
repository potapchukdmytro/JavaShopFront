import React, {useEffect, useState} from "react";
import axios from "axios";

interface Category {
    id: number;
    name: string;
}

const Home = () => {
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
            <h1 className="text-3x1 font-bold underline">Categories</h1>
            <ul>{listItems}</ul>
        </>
    )
}

export default Home;




