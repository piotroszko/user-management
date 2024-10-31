import { useQuery } from "@tanstack/react-query";
import { API_URLS, QUERY_KEYS } from "../api";
import { useState } from "react";
import { useErrorToastOnError } from "../useErrorToastOnError";
import { SortingState } from "@tanstack/react-table";

export const useUserTasksQuery = (propId: number) => {
  const [id, setId] = useState<number>(propId);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortingState>([]);
  const [filter, setFilter] = useState<"resolved" | "unresolved" | null>(null);
  const query = useQuery({
    queryKey: [QUERY_KEYS.USER_TASKS, id, page, sortBy, filter],
    queryFn: async () => {
      return await API_URLS.GET_USER_TASKS(
        id!,
        page,
        (sortBy?.[0]?.id as "createdDate" | "status") || undefined,
        sortBy?.[0]?.desc,
        filter
      );
    },
    enabled: !!id,
  });
  useErrorToastOnError(query.isError);

  return {
    params: {
      id,
      page,
      sortBy,
      filter,
    },
    setParams: {
      setId,
      setPage,
      setSortBy,
      setFilter,
    },
    query: query,
  };
};
