import {Dispatch} from "react";
import jwtDecode from "jwt-decode";
import {AuthUserActionType, IUser} from "./types";
import setAuthToken from "../../helpers/setAuthToken";

export const AuthUserToken = (token: string, dispatch: Dispatch<any>) => {
    const user = jwtDecode(token) as IUser;
    dispatch({
        type: AuthUserActionType.LOGIN_USER,
        payload: user
    });
    setAuthToken(token);
}