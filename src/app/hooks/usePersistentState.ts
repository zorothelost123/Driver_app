import { Dispatch, SetStateAction, useEffect, useState } from "react";

function resolveInitialValue<T>(initialValue: T | (() => T)) {
  return initialValue instanceof Function ? initialValue() : initialValue;
}

export function usePersistentState<T>(
  key: string,
  initialValue: T | (() => T),
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const fallbackValue = resolveInitialValue(initialValue);

    if (typeof window === "undefined") {
      return fallbackValue;
    }

    try {
      const storedValue = window.localStorage.getItem(key);

      if (storedValue === null) {
        return fallbackValue;
      }

      return JSON.parse(storedValue) as T;
    } catch {
      return fallbackValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Keep the UI responsive even if persistence is unavailable.
    }
  }, [key, state]);

  return [state, setState];
}
