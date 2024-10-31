import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/user";
import cors from "cors";

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use(cors());

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
