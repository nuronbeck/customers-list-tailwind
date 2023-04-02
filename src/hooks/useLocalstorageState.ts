import { useState, useEffect } from 'react';

// Version is used to invalidate old local storage values
const VERSION = 1;

export default function useLocalStorageState<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once

  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const parseStorageState = () => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      if (item) {
        const parsed = JSON.parse(item);
        if (parsed.version === VERSION) {
          setStoredValue(parsed.value);
        }
      }
    } catch (error) {
      // If error also return initialValue
      console.log(error);
    }
  };

  useEffect(() => {
    parseStorageState();
    window.addEventListener('storage', onStorageUpdate);

    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
  }, []);

  const onStorageUpdate = ({ key: storageKey }: StorageEvent) => {
    if (storageKey === key) {
      parseStorageState();
    }
  };

  // const [storedValue, setStoredValue] = useState<T>(() => {
  //   if (typeof window === "undefined") {
  //     return initialValue;
  //   }
  // });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify({ version: VERSION, value: valueToStore }));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}
