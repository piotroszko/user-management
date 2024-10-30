import express from "express";
import { validateData } from "../../middleware/validationMiddleware";
import { userCreationSchema, userLoginSchema } from "../../schemas/user";
import { loginUser, createUser } from "../../controller/user/user";

const userRouter = express.Router();

userRouter.post("/create", validateData(userCreationSchema), createUser);
userRouter.post("/login", validateData(userLoginSchema), loginUser);

export default userRouter;
