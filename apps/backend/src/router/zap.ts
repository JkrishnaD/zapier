import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapCreateSchema } from "../types";

const router = Router();
const prismaClient = new PrismaClient();

router.post("/", authMiddleware, async (req, res): Promise<any> => {
  // @ts-ignore
  const id: string = req.id;
  const body = req.body;
  const parsedData = ZapCreateSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  await prismaClient.$transaction(async (tx) => {
    const zap = await tx.zap.create({
      data: {
        name: parsedData.data.name || "Untitled Zap",
        userId: parseInt(id),
        triggerId: "",
        actions: {
          create: parsedData.data.actions.map((x, index): any => ({
            availableActionId: x.availableActionId,
            sortingOrder: index,
            metadata: x.actionMetadata,
          })),
        },
      },
    });
    const trigger = await tx.trigger.create({
      data: {
        availableTriggerId: parsedData.data.availableTriggerId,
        zapId: zap.id,
      },
    });

    await tx.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });
    return res.json({
      zapId: zap.id,
    });
  });
});

router.get("/:userId", authMiddleware, async (req, res): Promise<any> => {
  const userId = parseInt(req.params.userId);
  const zaps = await prismaClient.zap.findMany({
    where: {
      userId,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });

  return res.json({
    zaps,
  });
});

router.get(
  "/:userId/:zapId",
  authMiddleware,
  async (req, res): Promise<any> => {
    const userId = parseInt(req.params.userId);
    const zapId = req.body.zapId;
    const zap = await prismaClient.zap.findMany({
      where: {
        id: zapId,
        userId,
      },
      include: {
        actions: {
          include: {
            type: true,
          },
        },
        trigger: {
          include: {
            type: true,
          },
        },
      },
    });

    return res.json({
      zap,
    });
  }
);

export const zapRouter = router;
