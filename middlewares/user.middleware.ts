import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";
export async function userMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorizationHeader = req.headers["authorization"];
  console.log("authorizationHeader", authorizationHeader);

  if (!authorizationHeader?.startsWith("Bearer")) {
    res
      .json({
        message: "Please provide a valid bearer token",
      })
      .status(403);
    return;
  }

  const token = authorizationHeader?.split(" ")[1];

  if (!token) {
    return;
  }
  console.log("JWT secret:", process.env.JWT_SECRET)
  const validateToken = jwt.verify(token , process.env.JWT_SECRET!);
  console.log("validateToken", validateToken);
  if (!validateToken) {
    res.json({
      message: "invaid token",
    });
    return;
  }

  console.log("JWT_SECRET", process.env.JWT_SECRET);
  const decodedValue = jwt.decode(token);
  // console.log("decoded value", decodedValue);
  // console.log("type of decoded value", typeof decodedValue);

  req.userId = decodedValue as JwtPayload;
  // console.log("req.userId", req.userId);
  next();
}
