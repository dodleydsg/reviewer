import { useCallback, useState, useEffect } from "react";

// used from my previous projects and didn't want to start adjusting the types for the typescript version

export function useAsync(func, dependencies = []) {
  const { execute, ...state } = useAsyncInternal(func, dependencies, true);

  useEffect(() => {
    execute();
  }, [execute]);

  return state;
}

export function useAsyncFn(func, dependencies: [] = []) {
  return useAsyncInternal(func, dependencies, false);
}

function useAsyncInternal(func, dependencies, initialLoading = false) {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState();
  const [value, setValue] = useState();

  const execute = useCallback((...params) => {
    setLoading(true);
    return func(...params)
      .then((data) => {
        setValue(data);
        setError(undefined);
        return data;
      })
      .catch((error) => {
        setValue(undefined);
        setError(error);
        return Promise.reject(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, dependencies);

  return { loading, error, value, execute };
}
