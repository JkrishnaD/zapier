import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const client = new PrismaClient();
app.use(express.json());
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.body.userId;
  const zapId = req.body.zapId;
  const body = req.body;

  //we can add the password logic to verify the user who hitting the hook server
  await client.$transaction(async (tx) => {
    const run = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body,
      },
    });
    await tx.zapOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });

  res.json({
    message: "Message Recieved",
  });
});

app.listen(8000, () => {
  console.log("Hooks Server is Started");
});
