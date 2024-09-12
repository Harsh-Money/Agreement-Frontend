import urlJoin from "url-join";

const BASE_URL = "http://localhost:8080";
export const AUTH_URLS = {
    CLIENT_REGISTER: () => urlJoin(BASE_URL, "/client/register")
}