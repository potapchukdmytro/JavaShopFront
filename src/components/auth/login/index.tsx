import LoginPage from "./LoginPage";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";

const Login = () => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey="6LfWiT4lAAAAAGzmaZNH3d9EBhbUzDhU3Pe5qjBl">
            <LoginPage/>
        </GoogleReCaptchaProvider>
    );
}

export default Login;