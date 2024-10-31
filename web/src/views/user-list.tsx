import { UsersTable } from "@/components/custom/user-table/table";

export const UserList = () => {
  return (
    <div className="h-screen">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <UsersTable />
      </div>
    </div>
  );
};
