import express from "express";
import { userRouter } from "./router/user";
import { zapRouter } from "./router/zap";

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);

app.listen(4000, () => {
  console.log("express server started");
});
