import { QUERY_KEYS } from "@/api/api";
import { useChangeTaskStatusMutation } from "@/api/mutation/useChangeTaskStatusMutation";
import { DataTableColumnHeader } from "@/components/additional-ui/table/column-header";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Check, X, ClipboardX, ClipboardCheck } from "lucide-react";

export type TaskLite = {
  id: number;
  description: string;
  createdDate: string;
  status: "resolved" | "unresolved";
  userId: number;
};

export const columnsTasks: ColumnDef<TaskLite>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Status"></DataTableColumnHeader>
      );
    },
    cell: ({ row }) => {
      return row?.getValue("status") == "unresolved" ? (
        <X size={16} className="text-red-600 mx-2" />
      ) : (
        <Check size={16} className="text-green-600 mx-2" />
      );
    },
  },
  {
    accessorKey: "description",
    header: "Opis",
  },
  {
    accessorKey: "createdDate",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Data utworzenia"></DataTableColumnHeader>
      );
    },
    cell: ({ row }) => {
      return new Date(row?.getValue("createdDate")).toLocaleDateString();
    },
  },
  {
    accessorKey: "id",
    header: ({ table }) => {
      return table.getState().sorting.length > 0 ? (
        <Button
          variant={"outline"}
          className="text-xs h-8 p-2 mx-auto"
          onClick={() => {
            table.resetSorting();
          }}>
          <X size={12} />
        </Button>
      ) : null;
    },
    cell: ({ row }) => {
      return <Actions row={row} />;
    },
  },
];

const Actions = ({ row }: { row: Row<TaskLite> }) => {
  const { mutate, isPending } = useChangeTaskStatusMutation();
  const querClient = useQueryClient();
  return (
    <div className="flex items-end w-full justify-end">
      {isPending ? (
        <Spinner size={"small"} className="w-min" />
      ) : (
        <Button
          disabled={isPending}
          onClick={() => {
            mutate(
              {
                id: row?.original?.userId,
                status:
                  row?.getValue("status") == "resolved"
                    ? "unresolved"
                    : "resolved",
                taskId: row?.getValue("id"),
              },
              {
                onSuccess: () => {
                  querClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.USER_TASKS, row?.original?.userId],
                  });
                },
              }
            );
          }}
          variant={"ghost"}>
          {row?.getValue("status") == "resolved" ? (
            <ClipboardX size={25} className="text-red-600" />
          ) : (
            <ClipboardCheck size={25} className="text-green-600" />
          )}
        </Button>
      )}
    </div>
  );
};
