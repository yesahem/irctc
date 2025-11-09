import express, { type Request, type Response } from "express";
import { userLoginInput, userSignupInput } from "../types/types";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../src";
import "dotenv/config";

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

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 13);
    console.log("hashedPassword", hashedPassword);
    const userData = await prisma.user.create({
      data: {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        userName: req.body.username,
        password: hashedPassword,
      },
    });

    if (userData.userId != null) {
      res.json({
        message: "User added sucessfully",
        userId: userData.userId,
      });
      return;
    }
    res.json({
      message: "Can't create user",
    });
  } catch (err) {
    if (err instanceof Error) {
      res.json({
        message: "Can't create user",
        error: err,
      });
    }
  }
}

async function signIn(req: Request, res: Response) {
  const { success } = userLoginInput.safeParse(req.body);

  console.log("isSuccess", success);
  if (!success) {
    res.json({
      message: "Invalid Inputs",
    });
    return;
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            userName: req.body.username,
          },
          {
            email: req.body.email,
          },
        ],
      },
    });

    if (!existingUser) {
      res.json({
        message: "user doesn't exists with the given username",
      });
      return;
    }

    const comparedPassword = await bcrypt.compare(
      req.body.password,
      existingUser?.password,
    );

    if (!comparedPassword) {
      res.json({
        message: "entered password is incorrect",
      });
      return;
    }

    const token = jwt.sign(
      {
        userId: existingUser.userId,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      },
    );

    res.json({
      message: "user found",
      token,
    });
    return;
  } catch (err) {
    if (err instanceof Error) {
      console.log("error after instance");
      console.log(err);
    }
    res.json({
      message: "Something went wrong",
      error: err,
    });
    return;
  }

  res.json({
    messgae: "signin Route with valid inputs",
  });
}

authRouter.post("/signUp", signUp);
authRouter.post("/signin", signIn);
