import { useCallback, useEffect, useState } from "react";
import { requestService } from "../services/requestService";

export function useRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(() => {
    setLoading(true);
    requestService
      .list()
      .then(setRequests)
      .catch((err) => setError(err.response?.data?.detail || "Failed to load requests"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { requests, loading, error, refresh };
}
