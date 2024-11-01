import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { JWT_PASSWORD } from "./config";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization as string;

  try {
    const payload = jwt.verify(token, JWT_PASSWORD);
    // @ts-ignore
    req.id = payload.id;
    next();
  } catch (error) {
    res.status(403).json({
      message: "You are not logged in",
    });
  }
}
