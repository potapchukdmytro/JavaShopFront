import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {APP_ENV} from "../../env";
import Loader from "../common/loader";

interface ICategoryItem {
    id: number;
    name: string;
    image: string;
    description: string;
}

const Home = () => {
    const {GetCategoryList} = useActions();
    const {list} = useTypedSelector(store => store.category);
    const [loading, setLoading] = useState(false);

    const LoadCategories = async () => {
        try {
            await GetCategoryList();
        } catch (error: any) {
            console.log(error);
        }
    };
    //const [categories, setCategories] = useState<ICategoryItem[]>([]);

    useEffect(() => {
        setLoading(true);
        // axios.get<ICategoryItem[]>("http://localhost:8083/api/categories")
        //     .then(res => {
        //         setCategories(res.data);
        //     });

        LoadCategories();
        setLoading(false);
    }, []);
    return (
        <>
            <div className="bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {loading ? <Loader/> :
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                        <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
                        <div className="my-4">
                            <Link
                                to="categories/create"
                                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                            >
                                Додати категорію
                            </Link>
                        </div>
                        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                            {list.map((category: ICategoryItem) => (
                                <div key={category.id} className="group relative mb-3">
                                    <div
                                        className="mt-2 relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                        <img
                                            src={`${APP_ENV.REMOTE_HOST_NAME}files/600_` + category.image}
                                            alt={category.image}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <h3 className="mt-6 text-sm text-gray-500">
                                        <a href="#">
                                            <span className="absolute inset-0"/>
                                            {category.name}
                                        </a>
                                    </h3>
                                    <p className="text-base font-semibold text-gray-900">{category.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    }
                </div>
            </div>
        </>
    );
};
export default Home;