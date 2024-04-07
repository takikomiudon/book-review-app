import { useState } from "react";

const useLocalStorage = (keyname: string, defaultValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyname);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyname, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      console.log(error);
      return defaultValue;
    }
  });

  const setValue = (newValue: string) => {
    try {
      window.localStorage.setItem(keyname, JSON.stringify(newValue));
    } catch (error) {
      console.log(error);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};

export default useLocalStorage;
