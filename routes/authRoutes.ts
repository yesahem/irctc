import express, { type Request, type Response } from "express";

import { userLoginInput, userSignupInput } from "../types/types";

export const authRouter = express.Router();

async function signUp(req: Request, res: Response) {
  const { success } = userSignupInput.safeParse(req.body);

  if (!success) {
    res.json({
      message: "Invalid Inputs",
    });
    return;
  }

  if (req.body.age < 15) {
    res.json({
      message: "User should be at least 15 years old to register",
    });
    return;
  }

  if (req.body.age > 60) {
    res.json({
      message: "User should not be more than 60 years old ",
    });
    return;
  }

  res.json({
    message: "signup route with valid inputs",
  });
}

async function signIn(req: Request, res: Response) {
  const { success } = userLoginInput.safeParse(req.body);
  if (!success) {
    res.json({
      message: "Invalid Inputs",
    });
    return;
  }
  res.json({
    messgae: "signin Route with valid inputs",
  });
}

authRouter.post("/signUp", signUp);
authRouter.post("/signin", signIn);
