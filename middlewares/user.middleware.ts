import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";
export async function userMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader?.startsWith("Bearer ")) {
    res.status(403).json({
      message: "Please provide a valid bearer token",
    });
    return;
  }

  const token = authorizationHeader.split(" ")[1]?.trim();

  if (!token) {
    res.status(401).json({
      message: "Token is missing",
    });
    return;
  }

  let verifiedToken: string | JwtPayload;

  try {
    verifiedToken = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        message: "Token has expired. Please sign in again to obtain a new token.",
      });
      return;
    }
    res.status(401).json({
      message: "Invalid or expired token",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }

  if (typeof verifiedToken !== "object" || verifiedToken === null) {
    res.status(401).json({
      message: "Invalid token payload",
    });
    return;
  }

  req.userId = verifiedToken;

  next();
}
