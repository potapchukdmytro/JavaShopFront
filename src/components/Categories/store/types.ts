export interface ICategoryItem {
    id: number;
    name: string;
    image: string;
    description: string;
}

export interface ICategoryCreate {
    name: string;
    file: File | null;
    description: string;
}

export interface ICategoryState {
    list: Array<ICategoryItem>;
    loading: boolean;
}

export enum CategoryActionTypes {
    CATEGORY_LIST = "CATEGORY_LIST",
    CREATE_CATEGORY = "CREATE_CATEGORY",
    START_REQUEST = "START_REQUEST",
    SERVER_ERROR = "SERVER_ERROR",
}

export interface GetCategoriesAction {
    type: CategoryActionTypes.CATEGORY_LIST;
    payload: ICategoryState;
}

export interface CreateCategoryAction {
    type: CategoryActionTypes.CREATE_CATEGORY;
}

export interface StartRequestAction {
    type: CategoryActionTypes.START_REQUEST;
}

export interface ServerErrorAction {
    type: CategoryActionTypes.SERVER_ERROR;
}

export type CategoryActions = GetCategoriesAction | CreateCategoryAction | StartRequestAction | ServerErrorAction;