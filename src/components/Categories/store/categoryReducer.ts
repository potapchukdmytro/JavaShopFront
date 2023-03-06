import {CategoryActions, CategoryActionTypes, ICategoryState} from "./types";

const initialState: ICategoryState = {
    list: [],
    loading: false
};

export const categoryReducer = (
    state = initialState,
    action: CategoryActions
): ICategoryState => {
    switch (action.type) {
        case CategoryActionTypes.CATEGORY_LIST: {
            return {
                ...state,
                ...action.payload,
                loading: false
            };
        }
        case CategoryActionTypes.CREATE_CATEGORY: {
            return {
                ...state,
                loading: false
            };
        }
        case CategoryActionTypes.START_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case CategoryActionTypes.SERVER_ERROR: {
            return {
                ...state,
                loading: false
            };
        }
        default:
            return state;
    }
};