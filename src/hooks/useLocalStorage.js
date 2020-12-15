import { useState, useEffect } from 'react';

export default function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) || defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
    const localstorageArrayLength =
      JSON.parse(window.localStorage.getItem(key)).length === 0;
    if (localstorageArrayLength) {
      setState(defaultValue);
    }
  }, [defaultValue, key, state]);

  return [state, setState];
}
