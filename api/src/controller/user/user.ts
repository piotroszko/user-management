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
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface GetUsersRequest extends Request {
  query: z.infer<typeof getUsersQuerySchema>;
}
export const getUsers = async (req: GetUsersRequest, res: Response) => {
  const isAnySort = req.query.sortBy || req.query.order;
  const parsedPage = parseInt(req.query.page);
  const isValidPage = isNaN(parsedPage);
  const users = await prisma.user.findMany({
    ...(isAnySort && {
      orderBy: {
        [req.query.sortBy ?? "createdDate"]: req.query.order || "desc",
      },
    }),
    take: 10,
    skip: !isValidPage ? (parsedPage - 1) * 10 : 0,
  });
  const count = await prisma.user.count({});
  res.json({
    currentPage: !isValidPage ? parsedPage : 1,
    totalPages: Math.ceil(count / 10),
    content: users,
  });
};
export interface GetUserRequest extends Request {
  params: z.infer<typeof getUserParamsSchema>;
}
export const getUser = async (req: GetUserRequest, res: Response) => {
  const pasedId = parseInt(req.params.id);
  if (isNaN(pasedId)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: pasedId,
    },
  });
  res.json(user);
};

export interface GetUserTasksRequest extends Request {
  params: z.infer<typeof getUserParamsSchema>;
  query: z.infer<typeof getUsersTasksQuerySchema>;
}
export const getUserTasks = async (req: GetUserTasksRequest, res: Response) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  const parsePage = parseInt(req.query.page);
  const isValidPage = isNaN(parsePage);

  const tasks = await prisma.task.findMany({
    where: {
      userId: parsedId,
      ...(req.query.filter && {
        status: req.query.filter,
      }),
    },
    ...(req.query.sortBy && {
      orderBy: {
        [req.query.sortBy]: req.query.order || "desc",
      },
    }),
    take: 10,
    skip: !isValidPage ? (parsePage - 1) * 10 : 0,
  });
  const count = await prisma.task.count({
    where: {
      userId: parsedId,
      ...(req.query.filter && {
        status: req.query.filter,
      }),
    },
  });
  res.json({
    currentPage: !isValidPage ? parsePage : 1,
    totalPages: Math.ceil(count / 10),
    content: tasks,
  });
};

export interface CreateUserTaskRequest extends Request {
  body: z.infer<typeof taskCreationSchema>;
  params: z.infer<typeof getUserParamsSchema>;
}
export const createTask = async (req: CreateUserTaskRequest, res: Response) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  const createdTask = await prisma.task.create({
    data: {
      ...req.body,
      user: {
        connect: {
          id: parsedId,
        },
      },
    },
  });
  res.json(createdTask);
};

export interface PatchUserTaskRequest extends Request {
  body: z.infer<typeof patchTaskSchema>;
  params: z.infer<typeof getUsersTasksParamsSchema>;
}
export const patchTask = async (req: PatchUserTaskRequest, res: Response) => {
  const parsedId = parseInt(req.params.id);
  const parsedTaskId = parseInt(req.params.taskId);
  if (isNaN(parsedId) || isNaN(parsedTaskId)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const task = await prisma.task.update({
    where: {
      id: parsedTaskId,
    },
    data: {
      status: req.body.status,
    },
  });
  res.json(task);
};
