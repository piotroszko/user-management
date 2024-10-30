import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/user";

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.send("Hello, TypeScript Node Express!");
});

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
