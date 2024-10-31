import { UserLite } from "@/api/api";
import { DataTableColumnHeader } from "@/components/additional-ui/table/column-header";
import { Button } from "@/components/ui/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const columnsUsers: ColumnDef<UserLite>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Nazwa"></DataTableColumnHeader>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
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
  },
  {
    accessorKey: "id",
    header: ({ table }) => {
      return table.getState().sorting.length > 0 ? (
        <Button
          variant={"outline"}
          className="text-xs h-8 p-2"
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

const Actions = ({ row }: { row: Row<UserLite> }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-end w-full justify-end">
      <Button
        onClick={() => {
          navigate(`/${row.original.id}`);
        }}
        variant={"ghost"}>
        <ArrowRight size={25} />
      </Button>
    </div>
  );
};
