export interface IProductCreate {
    name: string;
    price: number;
    category_id: number;
    description: string;
    files: Array<File>;
}

export interface IProductItem {
    id: number;
    name: string;
    price: number;
    category_id: number;
    description: string;
    files: Array<string>;
}

export interface IProductState {
    list: Array<IProductItem>;
    loading: boolean;
}

export enum ProductActionTypes {
    PRODUCT_LIST = "PRODUCT_LIST",
    CREATE_PRODUCT = "CREATE_PRODUCT",
    START_REQUEST = "START_REQUEST",
    SERVER_ERROR = "SERVER_ERROR",
}

export interface GetProductAction {
    type: ProductActionTypes.PRODUCT_LIST;
    payload: IProductState;
}

export interface CreateProductAction {
    type: ProductActionTypes.CREATE_PRODUCT;
}

export interface StartRequestAction {
    type: ProductActionTypes.START_REQUEST;
}

export interface ServerErrorAction {
    type: ProductActionTypes.SERVER_ERROR;
}

export type ProductActions = GetProductAction | CreateProductAction | StartRequestAction | ServerErrorAction;