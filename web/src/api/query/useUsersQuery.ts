import { useQuery } from "@tanstack/react-query";
import { API_URLS, QUERY_KEYS } from "../api";
import { useState } from "react";
import { useErrorToastOnError } from "../useErrorToastOnError";
import { SortingState } from "@tanstack/react-table";

export const useUsersQuery = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortingState>([]);
  const [order, setOrder] = useState<"asc" | "desc">();

  const query = useQuery({
    queryKey: [QUERY_KEYS.USERS, page, sortBy, order],
    queryFn: async () => {
      return await API_URLS.GET_USERS(
        page,
        sortBy?.[0]?.id as "createdDate" | "name",
        order
      );
    },
  });
  useErrorToastOnError(query.isError);

  return {
    params: {
      page,
      sortBy,
      order,
    },
    setParams: {
      setPage,
      setSortBy,
      setOrder,
    },
    query: query,
  };
};
