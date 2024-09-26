import urlJoin from "url-join";
import ApiEngine from "./api.service";
import { BASE_URL } from "./authentication.service";

const OverviewServices = {
    getClient : () => {
        const getClientUrl = urlJoin(BASE_URL, "/client");
        return ApiEngine.get(getClientUrl)
    },
    getOwner : () => {
        const getOwnerUrl = urlJoin(BASE_URL, "/owner");
        return ApiEngine.get(getOwnerUrl)
    }
}

export default OverviewServices;