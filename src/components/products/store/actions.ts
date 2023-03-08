import {Dispatch} from "react";
import http from "../../../http_common";
import {IProductCreate, IProductItem, ProductActions, ProductActionTypes} from "./type";

export const GetProductList = () => async (dispatch: Dispatch<ProductActions>) => {
    try {
        dispatch({
            type: ProductActionTypes.START_REQUEST
        });

        const resp = await http.get<Array<IProductItem>>("/api/products");
        const {data} = resp;
        dispatch({
            type: ProductActionTypes.PRODUCT_LIST,
            payload: {
                list: data,
                loading: false
            }
        });
    } catch (error: any) {
        dispatch({
            type: ProductActionTypes.SERVER_ERROR
        });
        if (error.code === "ERR_NETWORK") {
            return Promise.reject("Не вдалося з'єднатися з сервером");
        }
        const {data} = error.response;
        return Promise.reject(data.message);
    }
};

export const CreateProduct = (newProduct: IProductCreate) => async (dispatch: Dispatch<ProductActions>) => {
    try {
        dispatch({
            type: ProductActionTypes.START_REQUEST
        });

        const resp = await http.post<IProductItem>("/api/products",
            newProduct,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        const {data} = resp;
        dispatch({
            type: ProductActionTypes.CREATE_PRODUCT
        });
        return Promise.resolve(data);
    } catch (error: any) {
        dispatch({
            type: ProductActionTypes.SERVER_ERROR,
        });
        if (error.code === "ERR_NETWORK") {
            return Promise.reject("Не вдалося з'єднатися з сервером");
        }
        const {data} = error.response;
        return Promise.reject(data.message);
    }
};