import express from "express";

import { signIn } from "../controllers/Signin.controller";
import { signUp } from "../controllers/Signup.controller";

export const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.post("/signin", signIn);
