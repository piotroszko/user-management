import { UserLite } from "@/components/custom/user-table/columns";
import axios from "axios";

const API_ADDRESS = "http://localhost:5000";

interface User {
  address: string;
  createdDate: string;
  email: string;
  id: number;
  name: string;
  phone: string;
}

export const API_URLS = {
  GET_USERS: (
    page: number = 1,
    sortBy?: "createdDate" | "name",
    order?: "asc" | "desc"
  ) =>
    axios.get<UserLite[]>(API_ADDRESS + "/api/users/", {
      params: {
        page,
        sortBy: sortBy,
        order,
      },
    }),
  GET_USER: (id: number) => axios.get<User>(API_ADDRESS + `/api/users/${id}`),

  GET_USER_TASKS: (
    id: number,
    page: number = 1,
    sortBy?: "createdDate" | "status",
    order?: "asc" | "desc",
    filter?: "resolved" | "unresolved"
  ) =>
    axios.get(API_ADDRESS + `/api/users/${id}/tasks`, {
      params: {
        page,
        sortBy,
        order,
        filter,
      },
    }),

  CREATE_TASK: (id: number, description: string) =>
    axios.post(API_ADDRESS + `/api/users/${id}/tasks/`, {
      description,
    }),
  PATCH_TASK_STATUS: (
    id: number,
    taskId: number,
    status: "resolved" | "unresolved"
  ) =>
    axios.patch(API_ADDRESS + `/api/users/${id}/tasks/${taskId}`, { status }),
};

export const QUERY_KEYS = {
  USERS: "USERS",
  USER: (id: number) => ["USER", id],
  USER_TASKS: (id: number) => ["USER_TASKS", id],
};
