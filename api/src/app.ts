import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/user";

const prisma = new PrismaClient();

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  console.log(users);
  res.send("Hello, TypeScript Node Express!" + users.toString());
});

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
