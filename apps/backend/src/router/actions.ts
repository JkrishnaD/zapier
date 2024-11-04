import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();
const client = new PrismaClient();

router.get("/available", async (req, res) => {
  const availableActions = await client.availableActions.findMany({});
  res.json({
    availableActions,
  });
});

export const actionRouter = router;
