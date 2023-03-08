import {useActions} from "../../../hooks/useActions";
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {string} from "yup";
import React, {ChangeEvent} from "react";
import {useFormik} from "formik";
import {IProductCreate} from "../store/type";

const ProductCreatePage = () => {
    const {CreateProduct} = useActions();
    const navigator = useNavigate();

    const modelInitialValues: IProductCreate = {
        name: "",
        description: "",
        files: new Array<File>(),
        price: 0,
        category_id: 0,
    }

    const productCreateSchema = Yup.object().shape({
        name: Yup.string().required("Обов'язкове поле"),
        description: Yup.string()
    });

    const onSubmitHandler = async (model: IProductCreate) => {
        try {
            const res = await CreateProduct(model);
            navigator("/");
        } catch (error: any) {
            console.log("Error", error);
        }
    }

    const onFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {target} = e;
        const {files} = target;
        if (files) {
            setFieldValue("files", files);
        }
        target.value = "";
    }

    const formik = useFormik<IProductCreate>({
        initialValues: modelInitialValues,
        validationSchema: productCreateSchema,
        onSubmit: onSubmitHandler
    });

    const {handleSubmit, values, handleChange, setFieldValue, errors, touched, handleBlur, isValid} = formik;

    const dataFileView = values.files.map((file, index) =>
        <img key={index} src={URL.createObjectURL(file)} alt={URL.createObjectURL(file)}/>
    );

    return (
        <>
            <div className="p-8 rounded border border-gray-200">
                <h1 className="font-medium text-3xl">Додати категорію</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mt-8 grid lg:grid-cols-1 gap-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="text-sm text-gray-700 block mb-1 font-medium"
                            >
                                Назва
                            </label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={values.name}
                                id="name"
                                onBlur={handleBlur}
                                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                placeholder="Вкажіть назву товара"
                            />
                            {touched.name && errors.name ? (
                                <div className="mx-3" style={{color: "red"}}>{errors.name}</div>
                            ) : null}
                        </div>

                        <div>
                            <label
                                htmlFor="price"
                                className="text-sm text-gray-700 block mb-1 font-medium"
                            >
                                Ціна
                            </label>
                            <input
                                type="number"
                                name="price"
                                onChange={handleChange}
                                value={values.price}
                                id="price"
                                onBlur={handleBlur}
                                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                placeholder="Вкажіть ціну"
                            />
                            {touched.name && errors.name ? (
                                <div className="mx-3" style={{color: "red"}}>{errors.name}</div>
                            ) : null}
                        </div>

                        <div>
                            <label
                                htmlFor="category"
                                className="text-sm text-gray-700 block mb-1 font-medium"
                            >
                                Категорія
                            </label>
                            <input
                                type="number"
                                name="category"
                                onChange={handleChange}
                                value={values.category_id}
                                id="category"
                                onBlur={handleBlur}
                                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                placeholder="Вкажіть категорію"
                            />
                            {touched.name && errors.name ? (
                                <div className="mx-3" style={{color: "red"}}>{errors.name}</div>
                            ) : null}
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Опис
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                onChange={handleChange}
                                value={values.description}
                                rows={4}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Вкажіть опис..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Фото
                            </label>

                            <div className="mt-1 flex items-center">
                                <label
                                    htmlFor="selectImage"
                                    className="inline-block w-20 overflow-hidden bg-gray-100"
                                >
                                    {/*{dataFileView}*/}

                                </label>
                                <label
                                    htmlFor="selectImage"
                                    className="ml-5 rounded-md border border-gray-300 bg-white
                        py-2 px-3 text-sm font-medium leading-4 text-gray-700
                        shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2
                        focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Change
                                </label>
                            </div>

                            <input type="file" id="selectImage" onChange={onFileHandler} className="hidden"/>
                        </div>
                    </div>
                    <div className="space-x-4 mt-8">
                        <button
                            disabled={!(formik.isValid && formik.dirty)}
                            type="submit"
                            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                        >
                            Додати
                        </button>
                        <Link
                            to="/"
                            className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                        >
                            На головну
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ProductCreatePage;