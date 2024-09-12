import ApiEngine from "./api.service";

const OverviewServices = {
    getClient : () => {
        return ApiEngine.get('http://localhost:8080/client')
    },
    getOwner : () => {
        console.log("was inside getOwner")
        return ApiEngine.get('http://localhost:8080/owner')
    }
}

export default OverviewServices;