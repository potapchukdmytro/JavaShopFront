import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {useDispatch} from "react-redux";
import {AuthUserActionType, IAuthResponse, ILogin, IRegister, IUser} from "../types";
import * as yup from "yup";
import jwtDecode from "jwt-decode";
import {useFormik} from "formik";
import http from "../../../http_common";
import GoogleAuth from "../google/GoogleAuth";

const RegisterPage: React.FC = () => {
    const {executeRecaptcha} = useGoogleReCaptcha();
    const navigator = useNavigate();
    const dispatch = useDispatch();

    const initValues: IRegister = {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        reCaptchaToken: ""
    };

    const registerSchema = yup.object({
        email: yup.string().required("Поле не може бути порожнім").email("Не вірний формат email"),
        password: yup.string().required("Поле не може бути порожнім"),
    });

    const onSubmitHandler = async (values: IRegister) => {
        try {
            if (!executeRecaptcha)
                return;
            values.reCaptchaToken = await executeRecaptcha();
            const resp = await http.post<IAuthResponse>('account/register',  values);
            console.log("Register user token", resp);
            const {token} = resp.data;
            localStorage.token = token;
            const user = jwtDecode(token) as IUser;
            dispatch({
                type: AuthUserActionType.LOGIN_USER,
                payload: user
            });
            navigator("/");
        } catch (error: any) {
            console.log("Щось пішло не так", error);
        }
    };

    const formik = useFormik({
        initialValues: initValues,
        onSubmit: onSubmitHandler,
        validationSchema: registerSchema
    });

    const {values, errors, touched, handleSubmit, handleChange, setFieldValue} = formik;

    return (
        <div className="mx-auto max-w-7xl px-8">
            <div className="p-8 rounded mx-auto max-w-xl">
                <h1 className="font-medium text-3xl text-center">Реєстрація</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mt-8 grid lg:grid-cols-1 gap-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="text-sm text-gray-700 block mb-1 font-medium"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                name="email"
                                onChange={handleChange}
                                value={values.email}
                                id="email"
                                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"

                            />
                            {errors.email && touched.email && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    <span className="font-medium">{errors.email}</span>
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="text-sm text-gray-700 block mb-1 font-medium"
                            >
                                Пароль
                            </label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={values.password}
                                id="password"
                                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"

                            />
                            {errors.password && touched.password && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    <span className="font-medium">{errors.password}</span>
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="firstname"
                                className="text-sm text-gray-700 block mb-1 font-medium"
                            >
                                Ім'я
                            </label>
                            <input
                                type="text"
                                name="firstname"
                                onChange={handleChange}
                                value={values.firstname}
                                id="firstname"
                                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"

                            />
                            {errors.firstname && touched.firstname && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    <span className="font-medium">{errors.firstname}</span>
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="lastname"
                                className="text-sm text-gray-700 block mb-1 font-medium"
                            >
                                Прізвище
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                onChange={handleChange}
                                value={values.lastname}
                                id="lastname"
                                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"

                            />
                            {errors.lastname && touched.lastname && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    <span className="font-medium">{errors.lastname}</span>
                                </p>
                            )}
                        </div>


                    </div>
                    <div className="mt-8 grid grid-cols-3 gap-4">
                        <button
                            type="submit"
                            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                        >
                            Зареєструватися
                        </button>
                        <Link
                            to="/login"
                            className=""
                        >
                            Є аккаунт? Увійти
                        </Link>
                        <GoogleAuth/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;