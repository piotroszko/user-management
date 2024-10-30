import { Request, Response } from "express";
import { userCreationSchema, userLoginSchema } from "../../schemas/user";
import { z } from "zod";

export interface CreateRequest extends Request {
  body: z.infer<typeof userCreationSchema>;
}
export const createUser = (req: CreateRequest, res: Response) => {
  res.json({ message: "User registered successfully", data: req.body });
};

export interface LoginRequest extends Request {
  body: z.infer<typeof userLoginSchema>;
}
export const loginUser = (req: LoginRequest, res: Response) => {
  req.body.email;
  res.json({ message: "User logged in successfully", data: req.body });
};
