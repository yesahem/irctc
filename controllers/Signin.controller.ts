import { type Request, type Response } from "express";
import { userLoginInput } from "../types/types";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../src";
import "dotenv/config";

export async function signIn(req: Request, res: Response) {
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
}
