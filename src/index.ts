import express, { type Request, type Response } from "express";
import { userRouter } from "../routes/userRoutes";
import { authRouter } from "../routes/authRoutes";
import { trainRoutes } from "../routes/trainRoutes";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = process.env.PORT || 3000;
export const prisma = new PrismaClient();
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/trains", trainRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "server is running ",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
