import { useCallback, useRef, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  if (typeof key !== "string") {
    throw new Error("Local storage key is not defined");
  }
  // Reference to the state value, here to make setValue function stable, like useState API
  const stateRef = useRef(null);
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);

      // Parse stored json or if none return initialValue
      stateRef.current = item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      stateRef.current = initialValue;
    }
    return stateRef.current;
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useCallback(
    (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(stateRef.current) : value;
        // Save state
        setStoredValue(valueToStore);
        stateRef.current = valueToStore;
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.error(error);
      }
    },
    [key]
  );
  return [storedValue, setValue];
};
