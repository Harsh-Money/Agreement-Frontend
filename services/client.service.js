import urlJoin from "url-join";
import ApiEngine from "./api.service";
import { BASE_URL } from "./authentication.service";

const Client = {
    getByName : (data) => {
        const getByNameUrl = urlJoin(BASE_URL,"/client/by-name");
        return ApiEngine.post('http://localhost:8080/client/by-name', data)
    }
}
export default Client;