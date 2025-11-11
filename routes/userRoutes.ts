import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller";
import express from "express";
export const userRouter = express.Router();

userRouter.get("/health", (req, res) => {
  res.json({
    message: "user route is healthy",
  });
});
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
