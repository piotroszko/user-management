import { useQuery } from "@tanstack/react-query";
import { API_URLS, QUERY_KEYS } from "../api";
import { useState } from "react";
import { useErrorToastOnError } from "../useErrorToastOnError";

export const useUserTasksQuery = () => {
  const [id, setId] = useState<number>();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"createdDate" | "status">();
  const [order, setOrder] = useState<"asc" | "desc">();
  const [filter, setFilter] = useState<"resolved" | "unresolved">();

  const query = useQuery({
    queryKey: [QUERY_KEYS.USER_TASKS(id!)],
    queryFn: async () => {
      return await API_URLS.GET_USER_TASKS(id!, page, sortBy, order, filter);
    },
    enabled: !!id,
  });
  useErrorToastOnError(query.isError);

  return {
    params: {
      id,
      page,
      sortBy,
      order,
      filter,
    },
    setParams: {
      setId,
      setPage,
      setSortBy,
      setOrder,
      setFilter,
    },
    query: query,
  };
};
