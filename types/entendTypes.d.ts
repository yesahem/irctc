import "express";
import type { JwtPayload } from "jsonwebtoken";
declare global {
  namespace Express {
    export interface Request {
      userId?: JwtPayload;
    }
  }
}
