import { useQuery } from "@tanstack/react-query";
import { API_URLS, QUERY_KEYS } from "../api";
import { useState } from "react";
import { useErrorToastOnError } from "../useErrorToastOnError";

export const useUsersQuery = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"createdDate" | "name">();
  const [order, setOrder] = useState<"asc" | "desc">();

  const query = useQuery({
    queryKey: [QUERY_KEYS.USERS, page, sortBy, order],
    queryFn: async () => {
      return await API_URLS.GET_USERS(page, sortBy, order);
    },
  });
  useErrorToastOnError(query.isError);
  console.log(query.data);

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
