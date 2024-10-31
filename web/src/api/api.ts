import axios from "axios";

const API_ADDRESS = "http://localhost:5000";

interface PaginatedResponse<T> {
  currentPage: number;
  totalPages: number;
  content: T[];
}

interface User {
  address: string;
  createdDate: string;
  email: string;
  id: number;
  name: string;
  phone: string;
}

export type UserLite = {
  id: number;
  name: string;
  email: string;
  createdDate: string;
};

export type TaskLite = {
  createdDate: string;
  description: string;
  id: number;
  status: "resolved" | "unresolved";
  userId: number;
};

export const API_URLS = {
  GET_USERS: (
    page: number = 1,
    sortBy?: "createdDate" | "name",
    isDesc?: boolean
  ) =>
    axios.get<PaginatedResponse<UserLite>>(API_ADDRESS + "/api/users/", {
      params: {
        page,
        sortBy: sortBy,
        order: isDesc ? "desc" : "asc",
      },
    }),
  GET_USER: (id: number) => axios.get<User>(API_ADDRESS + `/api/users/${id}`),

  GET_USER_TASKS: (
    id: number,
    page: number = 1,
    sortBy?: "createdDate" | "status",
    isDesc?: boolean,
    filter?: "resolved" | "unresolved" | null
  ) =>
    axios.get<PaginatedResponse<TaskLite>>(
      API_ADDRESS + `/api/users/${id}/tasks`,
      {
        params: {
          page,
          sortBy,
          order: isDesc ? "desc" : "asc",
          filter,
        },
      }
    ),

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
  USER: "USER",
  USER_TASKS: "USER_TASKS",
};
