import { useEffect } from "react";
import http from "../../../http_common";
import {IAuthResponse} from "../types";
import {AuthUserToken} from "../actions";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const GoogleAuth = () => {
    const navigator = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleLogin = async (resp: any) => {
        console.log("Google resp", resp);
        const token = resp.credential;
        try {
            const resp = await http.post<IAuthResponse>("account/google-auth", {token});
            AuthUserToken(resp.data.token, dispatch);
            navigator("/");

        } catch (error: any) {
            console.log("Щось пішло не так", error);
        }
    }

    useEffect(() => {
        //global google
        window.google.accounts!.id.initialize({
            client_id: "261455260542-ttj9ktco9hd8mc3bmckirig4vj5nbtup.apps.googleusercontent.com",
            callback: handleGoogleLogin
        });
        window.google.accounts!.id.renderButton(document.getElementById("signInDiv"),{
            theme: "outline", size: "medium", type: "standard", text: "signin"
        });
    }, []);

    return (
        <>
            <div id="signInDiv"></div>
        </>
    );
}
export default GoogleAuth;