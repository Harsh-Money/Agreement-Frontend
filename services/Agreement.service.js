import urlJoin from "url-join";
import ApiEngine from "./api.service";
import LocalStorageService from "./localstorage.service";
import { BASE_URL } from "./authentication.service";

const Agreement = {
    uploadAgreement: async (formData) => {
      const uploadImageUrl = urlJoin(BASE_URL, "/agreement/image-upload")
        try{
        const response = await fetch(uploadImageUrl, {
            method: "POST",
            headers: {
              // Since we're sending multipart data, we don't need to manually set Content-Type here.
              // The browser will automatically set the boundary in Content-Type when using FormData.
              "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_API_BASE_URL,
              "Authorization": `Bearer ${LocalStorageService.get("jwtToken")}`
            },
            body: formData,  // Send the FormData object containing the multipart data
          });
      
          // Check if the response is successful
          if (!response.ok) {
            throw new Error("Failed to upload agreement.");
          }
      
          // Parse and return the response
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error uploading agreement:", error);
          throw error;
        }
    },

    sendAgreement : (data) => {
      const sendAgreementUrl = urlJoin(BASE_URL, "/client/send-agreement");
      return ApiEngine.post(sendAgreementUrl, data)
    },

    getAllAgreementOfOwner : (ownerId) => {
      const getAllAgreementUrl = urlJoin(BASE_URL, `/agreement/all-agreement-of-ownerid/${ownerId}`)
      return ApiEngine.get(getAllAgreementUrl)
    },

    getAllAgreementOfClient : (clientId) => {
      const getAllAgreementUrl = urlJoin(BASE_URL, `/agreement/all-agreement-of-clientid/${clientId}`)
      return ApiEngine.get(getAllAgreementUrl)
    }

    
}
export default Agreement;