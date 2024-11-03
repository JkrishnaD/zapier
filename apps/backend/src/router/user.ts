import { PrismaClient } from "@prisma/client";

import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

const router = Router();

const prismaClient = new PrismaClient();

router.post("/signin", async (req, res): Promise<any> => {
  const data = req.body;
  const parsedData = SigninSchema.safeParse(data);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.email,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    return res.status(403).json({
      message: "User doesn't exist",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_PASSWORD
  );

  res.json({
    userId:user.id,
    token: token,
  });
});

router.post("/signup", async (req, res): Promise<any> => {
  const data = req.body;
  const parsedData = SignupSchema.safeParse(data);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  const existingUser = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.email,
    },
  });

  if (existingUser) {
    return res.status(403).json({
      message: "User Already Exist",
    });
  }

  const user = await prismaClient.user.create({
    data: {
      name: parsedData.data.name,
      email: parsedData.data.email,
      password: parsedData.data.password,
    },
  });

  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_PASSWORD
  );

  res.json({
    userId:user.id,
    token: token,
  });
});

router.get("/:userId", authMiddleware, async (req, res) => {
  // @ts-ignore
  const id = req.id;
  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  res.json({
    user,
  });
});

export const userRouter = router;
