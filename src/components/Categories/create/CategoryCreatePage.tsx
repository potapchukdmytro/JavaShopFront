import {Link, useNavigate} from "react-router-dom";
import React, {ChangeEvent} from "react";
import {ICategoryCreate} from "../types";
import axios from "axios";
import {ErrorMessage, useFormik} from "formik";
import * as Yup from 'yup';
import {ObjectSchema, string} from "yup";

const CategoryCreatePage = () => {

    const navigator = useNavigate();

    const modelInitialValues: ICategoryCreate = {
        name: "",
        description: "",
        base64: ""
    }

    const categoryCreateSchema = Yup.object().shape({
        name: Yup.string().required("Обов'язкове поле"),
        description: Yup.string(),
        base64: string()
    });

    const onSubmitHandler = async (model: ICategoryCreate) => {
        try {
            const item = axios.post("http://localhost:8083/api/categories", model);
            console.log("Category saved");
            navigator("/");
        } catch (error: any) {
            console.log("Error", error);
        }
    }

    const onFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {target} = e;
        const {files} = target;
        if (files) {
            const file = files[0];
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = (readFile: ProgressEvent<FileReader>) => {
                const result = readFile.target?.result as string;
                setFieldValue("base64", result);
            };
        }
        target.value = "";
    }

    const formik = useFormik<ICategoryCreate>({
        initialValues: modelInitialValues,
        validationSchema: categoryCreateSchema,
        onSubmit: onSubmitHandler
    });

    const {handleSubmit, values, handleChange, setFieldValue, errors, touched, handleBlur, isValid} = formik;

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
                                placeholder="Вкажіть назву категорії"
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
                                    {values.base64 === "" ? (
                                        <svg
                                            className="h-full w-full text-gray-300"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                                        </svg>
                                    ) : (
                                        <img src={values.base64} alt="image"/>
                                    )}

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
};

export default CategoryCreatePage;