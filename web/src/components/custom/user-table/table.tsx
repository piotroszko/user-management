import { useUsersQuery } from "@/api/query/useUsersQuery";
import { columnsUsers } from "./columns";
import { Table } from "@/components/additional-ui/table/table";

export function UsersTable() {
  const {
    query: { data, isLoading },
    params: { page, sortBy },
    setParams: { setPage, setSortBy },
  } = useUsersQuery();
  return (
    <div className=" flex justify-center">
      <div className="rounded-md border w-1/2 min-w-max max-w-2xl p-1">
        <Table
          setSorting={setSortBy}
          sorting={sortBy}
          columns={columnsUsers}
          data={data?.data.content || []}
          isLoading={isLoading}
          pagination={{
            page: page || 1,
            pageCount: data?.data.totalPages || 1,
            nextPage: () => setPage((page || 1) + 1),
            previousPage: () => setPage((page || 1) - 1),
            toFirstPage: () => setPage(1),
            toLastPage: () => setPage(data?.data.totalPages || 1),
          }}
        />
      </div>
    </div>
  );
}
