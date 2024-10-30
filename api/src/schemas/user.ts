import { z } from "zod";

export const taskCreationSchema = z.object({
  description: z.string(),
});

export const patchTaskSchema = z.object({
  status: z.enum(["resolved", "unresolved"]),
});

export const getUsersQuerySchema = z.object({
  page: z.string().default("1"),
  sortBy: z.enum(["createdDate", "name"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export const getUsersTasksQuerySchema = z.object({
  page: z.string().default("1"),
  sortBy: z.enum(["createdDate", "status"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  filter: z.enum(["resolved", "unresolved"]).optional(),
});

export const getUserParamsSchema = z.object({
  id: z.string(),
});

export const getUsersTasksParamsSchema = z.object({
  id: z.string(),
  taskId: z.string(),
});
