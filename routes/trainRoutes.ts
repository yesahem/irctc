import express, { type Request, type Response } from "express";

export const trainRoutes = express.Router();

function getAllTrain(req: Request, res: Response) {
  res.json({
    message: "this is the route for getting all the Trains",
  });
}

trainRoutes.get("/", getAllTrain);
