import urlJoin from "url-join";
import ApiEngine from "./api.service";
import { AUTH_URLS } from "./url.service";


export const BASE_URL = "http://localhost:8080";

const AuthenticationService = {
    registerClientWithUsername : async(inputdata) => {
        const registerUrl = urlJoin(BASE_URL, "/client/register");
        try{
            const response = await fetch(registerUrl, {
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_API_BASE_URL,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(inputdata),  
              });
              if (!response.ok) {
                throw new Error("Failed to register client.");
              }
              const data = await response.json();
              return data;
            } catch (error) {
              console.error("Error register client:", error);
              throw error;
            }
    },
    loginClientWithUsername : async(inputdata) => {
        const loginUrl = urlJoin(BASE_URL, "/client/login");
        try{
            console.log("came in loginClientWithUsername: ",inputdata)
            const response = await fetch(loginUrl, {
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_API_BASE_URL,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(inputdata),  
              });
              if (!response.ok) {
                throw new Error("Failed to login client.");
              }
              const data = await response.json();
              return data;
            } catch (error) {
              console.error("Error login client:", error);
              throw error;
            }
    },
    registerOwnerWithUserName : async(inputdata) => {
        const registerUrl = urlJoin(BASE_URL, "/owner/register");
        try{
            const response = await fetch(registerUrl, {
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_API_BASE_URL,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(inputdata),  
              });
              if (!response.ok) {
                throw new Error("Failed to register owner.");
              }
              const data = await response.json();
              return data;
            } catch (error) {
              console.error("Error register owner:", error);
              throw error;
            }
    },
    loginOwnerWithUsername : async(inputdata) => {
        const loginUrl = urlJoin(BASE_URL, "/owner/login");
        try{
            const response = await fetch(loginUrl, {
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_API_BASE_URL,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(inputdata),  
              });
              if (!response.ok) {
                throw new Error("Failed to login owner.");
              }
              const data = await response.json();
              return data;
            } catch (error) {
              console.error("Error login owner:", error);
              throw error;
            }
    }
}

export default AuthenticationService;