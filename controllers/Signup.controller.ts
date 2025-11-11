import { type Request, type Response } from "express";
import { userSignupInput } from "../types/types";
import bcrypt from "bcryptjs";
import { prisma } from "../src";
import "dotenv/config";

export async function signUp(req: Request, res: Response) {
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
