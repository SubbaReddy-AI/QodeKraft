import { useEffect, useState } from "react";

function useFetch(fetchFunction, immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchFunction(...args);

      setData(response);

      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute().catch(() => {});
    }
  }, []);

  return {
    data,
    loading,
    error,
    execute
  };
}

export default useFetch;