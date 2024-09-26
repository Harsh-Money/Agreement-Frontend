import urlJoin from "url-join";
import ApiEngine from "./api.service";
import { BASE_URL } from "./authentication.service";

const Owner = {
    getByName : (data) => {
        const getByNameUrl = urlJoin(BASE_URL, "/owner/by-name")
        return ApiEngine.post(getByNameUrl, data)
    },
    approveAgreementByOwner : (agreementId) => {
        const approveAgreementByOwnerUrl = urlJoin(BASE_URL, `/owner/agreement/approve/${agreementId}`)
        return ApiEngine.post(approveAgreementByOwnerUrl)
      }
}
export default Owner;