import { useQuery } from "@tanstack/react-query";
import { API_URLS, QUERY_KEYS } from "../api";
import { useState } from "react";
import { useErrorToastOnError } from "../useErrorToastOnError";

export const useUserQuery = (propId: number) => {
  const [id, setId] = useState<number>(propId);

  const query = useQuery({
    queryKey: [QUERY_KEYS.USER, id],
    queryFn: async () => {
      return await API_URLS.GET_USER(id!);
    },
    enabled: !!id,
  });

  useErrorToastOnError(query.isError);

  return {
    params: {
      id,
    },
    setParams: {
      setId,
    },
    query: query,
  };
};
