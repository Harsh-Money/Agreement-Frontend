import { useUserStore } from "../stores/user.store";
import LocalStorageService from "./localstorage.service";


const getHeaders = (headers) => {

    const userData = useUserStore.getState().userData;
  return {
    "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_API_BASE_URL,
    "Content-Type": "application/json",
    ...((userData?.jwtToken || LocalStorageService.get("jwtToken") != null) && { "Authorization": `Bearer ${LocalStorageService.get("jwtToken")}` }),
    // "X-ID-TOKEN": useUserStore.getState().userData?.idToken,
    ...headers,
  };
};
const getUrlWithParams = (url, params) => {
  url = new URL(url);
  opt = Object.assign({}, opt);
  if (params) {
    url.search = new URLSearchParams(opt.params).toString();
  }
  return url;
};
let engine = {
  get: async function (url, opt) {
    opt = Object.assign({}, opt);
    if (opt.params) {
      url = getUrlWithParams(url, opt.params);
    }
    const res = await fetch(url, {
      headers: getHeaders(opt.headers),
      credentials: "include",
    });
    if (!res.ok) {
      let error = await res.json();
    //   error = serializeFetchError(error);
      throw new Error(error.message);
    }
    return res.json();
  },

  post: async function (url, data, opt) {
    opt = Object.assign({}, opt);
    if (opt.params) {
      url = getUrlWithParams(url, opt.params);
    }
    const res = await fetch(url, {
      headers: getHeaders(opt.headers),
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    });
    console.log("header of post req. : ",getHeaders(opt.headers))
    if (!res.ok) {
      let error = await res.json();
    //   error = serializeFetchError(error);
      throw new Error(error.message);
    }
    return res.json();
  },

  put: async function (url, data, opt) {
    opt = Object.assign({}, opt);
    if (opt.params) {
      url = getUrlWithParams(url, opt.params);
    }
    const res = await fetch(url, {
      headers: getHeaders(opt.headers),
      method: "PUT",
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) {
      let error = await res.json();
    //   error = serializeFetchError(error);
      throw new Error(error.message);
    }
    return res.json();
  },

  patch: async function (url, data, opt) {
    opt = Object.assign({}, opt);
    if (opt.params) {
      url = getUrlWithParams(url, opt.params);
    }
    const res = await fetch(url, {
      headers: getHeaders(opt.headers),
      method: "PATCH",
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) {
      let error = await res.json();
    //   error = serializeFetchError(error);
      throw new Error(error.message);
    }
    return res.json();
  },

  del: async function (url, data, opt) {
    opt = Object.assign({}, opt);
    if (opt.params) {
      url = getUrlWithParams(url, opt.params);
    }
    const res = await fetch(url, {
      headers: getHeaders(opt.headers),
      method: "DELETE",
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) {
      let error = await res.json();
    //   error = serializeFetchError(error);
      throw new Error(error.message);
    }
    return res.json();
  },
};

export default engine;
