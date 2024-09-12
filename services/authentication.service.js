import ApiEngine from "./api.service";
import { AUTH_URLS } from "./url.service";

const AuthenticationService = {
    registerClientWithUsername : (data) => {
        console.log(data)
        return ApiEngine.post('http://localhost:8080/client/register', data);
    },
    loginClientWithUsername : (data) => {
        return ApiEngine.post('http://localhost:8080/client/login', data);
    }
}

export default AuthenticationService;