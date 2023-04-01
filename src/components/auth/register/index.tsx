import RegisterPage from "./RegisterPage";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";

const Register = () => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey="6LfWiT4lAAAAAGzmaZNH3d9EBhbUzDhU3Pe5qjBl">
            <RegisterPage/>
        </GoogleReCaptchaProvider>
    );
}

export default Register;