import { type Request, type Response } from "express";
import { prisma } from "../src";
import { userSignupInput } from "../types/types";
import bcrypt from "bcryptjs";
// Controller functions (placeholders)
export async function getAllUsers(req: Request, res: Response) {
  console.log("inside get All route");
  const getAllUsers = await prisma.user.findMany();

  if (!getAllUsers) {
    res.json({
      message: "unable to get users from the db.",
    });
    return;
  }

  res.json({
    message: "Returning all users",
    getAllUsers,
  });
}

export async function getUserById(req: Request, res: Response) {
  // console.log(req.params.id)

  if (!req.params.id) {
    res.json({
      message: "Invalid id",
    });
    return;
  }

  const getUserById = await prisma.user.findUnique({
    where: {
      userId: req.params.id as string,
    },
  });
  if (!getUserById) {
    res.json({
      message: "No user found with given id",
    });
    return;
  }

  res.json({
    message: "User found with id 12",
    user: getUserById,
  });
}

// Create user is implemented in the auth routes

export async function updateUser(req: Request, res: Response) {
  const { success } = userSignupInput.safeParse(req.body);

  if (!success) {
    res.json({
      message: "Invalid Inputs",
    });
    return;
  }

  if (req.body.age < 15) {
    res.json({
      message: "User must be atleast 15 years old",
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
    const updateUser = await prisma.user.update({
      where: {
        //TODO: Replace the email with the user id gotten from token
        userId: req.params.id,
      },
      data: {
        age: req.body.age,
        name: req.body.name,
        email: req.body.email,
        userName: req.body.username,
        password: hashedPassword,
      },
    });

    if (!updateUser) {
      res.json({
        message: `can't update user`,
      });
    }
    res.json({
      message: `user with ${req.body.email} is updated `,
      updatedUser: updateUser,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.json({
        message: "something went wrong",
        err,
      });
    }
  }
}

// TODO:
export function deleteUser(req: Request, res: Response) {
  res.json({ message: `Delete user with ID ${req.params.id}` });
}
