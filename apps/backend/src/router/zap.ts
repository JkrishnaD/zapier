import { Router } from "express";
import { authMiddleware } from "../middleware";

const router = Router();

router.post("/", authMiddleware, (req, res) => {
  
});

router.get("/", authMiddleware, (req, res) => {
  console.log("zaps");
});

router.get("/:zapId", authMiddleware, (req, res) => {
  console.log("zap");
});

export const zapRouter = router;
