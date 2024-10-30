import { Request, Response } from "express";
import { z } from "zod";
import {
  getUserParamsSchema,
  getUsersQuerySchema,
  getUsersTasksParamsSchema,
  getUsersTasksQuerySchema,
  patchTaskSchema,
  taskCreationSchema,
} from "../../schemas/user";

export interface GetUsersRequest extends Request {
  query: z.infer<typeof getUsersQuerySchema>;
}
export const getUsers = (req: GetUsersRequest, res: Response) => {
  res.json({ message: "getUsers", data: req.query });
};
export interface GetUserRequest extends Request {
  params: z.infer<typeof getUserParamsSchema>;
}
export const getUser = (req: GetUserRequest, res: Response) => {
  res.json({ message: "getUser", data: req.body });
};

export interface GetUserTasksRequest extends Request {
  params: z.infer<typeof getUserParamsSchema>;
  query: z.infer<typeof getUsersTasksQuerySchema>;
}
export const getUserTasks = (req: GetUserTasksRequest, res: Response) => {
  res.json({ message: "getUserTasks", data: req.body });
};

export interface CreateUserTaskRequest extends Request {
  body: z.infer<typeof taskCreationSchema>;
  params: z.infer<typeof getUserParamsSchema>;
}
export const createTask = (req: CreateUserTaskRequest, res: Response) => {
  res.json({ message: "createTask", data: req.body });
};

export interface PatchUserTaskRequest extends Request {
  body: z.infer<typeof patchTaskSchema>;
  params: z.infer<typeof getUsersTasksParamsSchema>;
}
export const patchTask = (req: PatchUserTaskRequest, res: Response) => {
  res.json({ message: "patchTask", data: req.body });
};
