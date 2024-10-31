import { useUsersQuery } from "@/api/query/useUsersQuery";
import { columnsUsers } from "./columns";
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
import { useState } from "react";
import { Label } from "@/components/ui/label";

export function UsersTable() {
  const [filter, setFilter] = useState<"resolved" | "unresolved" | null>(null);
  const {
    query: { data, isLoading },
  } = useUsersQuery();
  return (
    <div className=" flex justify-center">
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
        </div>
        <Table
          columns={columnsUsers}
          data={data?.data || []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
