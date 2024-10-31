import { Table } from "@/components/additional-ui/table/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useUserTasksQuery } from "@/api/query/useUserTasksQuery";
import { columnsTasks } from "./columns";
import AddTask from "./add-task";

interface TaskTableProps {
  userId: number;
}

export function TaskTable({ userId }: TaskTableProps) {
  const {
    query: { data, isLoading },
    params: { page, filter, sortBy },
    setParams: { setPage, setFilter, setSortBy },
  } = useUserTasksQuery(userId);
  return (
    <div className="flex justify-center">
      <div className="rounded-md border w-1/2 min-w-max max-w-2xl p-1">
        <div className="m-1 flex flex-row gap-1 items-end">
          <div className="flex flex-col gap-2">
            <Select
              onValueChange={(value) => {
                setFilter(value as "unresolved" | "resolved");
              }}
              value={filter as string}>
              <Label htmlFor="status" className="ml-1">
                Status
              </Label>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" id="status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="unresolved">Nie zakończone</SelectItem>
                  <SelectItem value="resolved">Zakończone</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {filter && (
            <Button
              variant={"ghost"}
              onClick={() => {
                setFilter(null);
              }}>
              <X size={16}></X>
            </Button>
          )}
          <AddTask userId={userId} />
        </div>
        <Table
          setSorting={setSortBy}
          sorting={sortBy}
          columns={columnsTasks}
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
