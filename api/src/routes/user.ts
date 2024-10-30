import express from "express";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middleware/validationMiddleware";
import {
  getUserParamsSchema,
  getUsersQuerySchema,
  getUsersTasksParamsSchema,
  getUsersTasksQuerySchema,
  patchTaskSchema,
  taskCreationSchema,
} from "../schemas/user";
import {
  createTask,
  getUser,
  getUsers,
  getUserTasks,
  patchTask,
} from "../controller/user/user";

const userRouter = express.Router();

userRouter.get("/", validateQuery(getUsersQuerySchema), getUsers);
userRouter.get("/:id", validateParams(getUserParamsSchema), getUser);

userRouter.get(
  "/:id/tasks",
  [
    validateParams(getUserParamsSchema),
    validateQuery(getUsersTasksQuerySchema),
  ],
  getUserTasks
);
userRouter.post(
  "/:id/tasks",
  [validateParams(getUserParamsSchema), validateBody(taskCreationSchema)],
  createTask
);
userRouter.patch(
  "/:id/tasks/:taskId",
  [validateBody(patchTaskSchema), validateParams(getUsersTasksParamsSchema)],
  patchTask
);

export default userRouter;
