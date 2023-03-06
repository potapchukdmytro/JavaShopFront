import {rootReducer} from "../store";
import {TypedUseSelectorHook, useSelector} from "react-redux";

type rootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<rootState> = useSelector;