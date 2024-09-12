const KEY = `env_ls`;

const LocalStorageService = {
    get: (itemName) => {
      if (typeof window !== "undefined") {
        const key = `${KEY}_${itemName}`;
        const item = localStorage.getItem(key);
  
        if (item) {
            return item;
          }
         else {
          return null;
        }
      }
    },
  
    set: (itemName, item) => {
      const key = `${KEY}_${itemName}`;
      if (typeof item === "object") {
        localStorage.setItem(key, JSON.stringify(item));
      } else {
        localStorage.setItem(key, item);
      }
    },
  
    remove: (itemName) => {
      const key = `${KEY}_${itemName}`;
      localStorage.removeItem(key);
    },
  };
  
  export default LocalStorageService;
  