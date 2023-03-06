import {Dispatch} from "react";
import {CategoryActions, CategoryActionTypes, ICategoryCreate, ICategoryItem} from "./types";
import http from "../../../http_common";

export const GetCategoryList = () => async (dispatch: Dispatch<CategoryActions>) => {
    try {
        dispatch({
            type: CategoryActionTypes.START_REQUEST
        });

        const resp = await http.get<Array<ICategoryItem>>("/api/categories");
        const {data} = resp;
        dispatch({
            type: CategoryActionTypes.CATEGORY_LIST,
            payload: {
                list: data,
                loading: false
            }
        });
    } catch (error: any) {
        dispatch({
            type: CategoryActionTypes.SERVER_ERROR
        });
        if (error.code === "ERR_NETWORK") {
            return Promise.reject("Не вдалося з'єднатися з сервером");
        }
        const {data} = error.response;
        return Promise.reject(data.message);
    }
};

export const CreateCategory = (newCategory: ICategoryCreate) => async (dispatch: Dispatch<CategoryActions>) => {
    try {
        dispatch({
            type: CategoryActionTypes.START_REQUEST
        });

        const resp = await http.post<ICategoryItem>("/api/categories",
            newCategory,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        const {data} = resp;
        dispatch({
            type: CategoryActionTypes.CREATE_CATEGORY
        });
        return Promise.resolve(data);
    } catch (error: any) {
        dispatch({
            type: CategoryActionTypes.SERVER_ERROR,
        });
        if (error.code === "ERR_NETWORK") {
            return Promise.reject("Не вдалося з'єднатися з сервером");
        }
        const {data} = error.response;
        return Promise.reject(data.message);
    }
};