import express, { type Request, type Response } from "express";
import { searchTrainSchema } from "../types/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const trainRoutes = express.Router();

function getAllTrain(req: Request, res: Response) {
  res.json({
    message: "this is the route for getting all the Trains",
  });
}

async function getTrainsBySourceAndDestination(req: Request, res: Response) {
  const { success, data } = searchTrainSchema.safeParse(req.body);

  if (!success) {
    res.status(400).json({
      message: "Invalid inputs",
    });
    return;
  }

  try {
    const trains = await prisma.train.findMany({
      where: {
        origin: data.source,
        destination: data.destination,
      },
      select: {
        trainId: true,
        trainName: true,
        origin: true,
        destination: true,
        departure: true,
        arrival: true,
      },
    });

    if (trains.length === 0) {
      res.status(404).json({
        message: "No trains found for the given source and destination",
        trains: [],
      });
      return;
    }

    res.status(200).json({
      message: "Trains found successfully",
      count: trains.length,
      trains,
    });
  } catch (error) {
    console.error("Error fetching trains:", error);
    res.status(500).json({
      message: "Internal server error while fetching trains",
    });
  }
}


export async function getTicketsForTrain(req: Request, res: Response) {
  try {
    const trainNumber = req.query.trainNumber || req.params.trainNumber;

    if (!trainNumber) {
      res.status(400).json({
        message: "Train number is required",
      });
      return;
    }

    // Check if train exists and get train details by train number
    const train = await prisma.train.findUnique({
      where: {
        trainNumber: trainNumber as string,
      },
    });

    if (!train) {
      res.status(404).json({
        message: "Train not found with the given train number",
      });
      return;
    }

    // Get all booked tickets for this train
    const bookedTickets = await prisma.tickets.findMany({
      where: {
        trainId: train.trainId,
        bookingStatus: {
          in: ["CONFIRM", "RAC", "WAITLIST"],
        },
      },
      select: {
        ticketId: true,
        passengerName: true,
        seatNumber: true,
        class: true,
        dateOfJourney: true,
        bookingStatus: true,
      },
    });

    // Count tickets by class
    const ticketsByClass = bookedTickets.reduce((acc, ticket) => {
      acc[ticket.class] = (acc[ticket.class] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Count tickets by status
    const ticketsByStatus = bookedTickets.reduce((acc, ticket) => {
      acc[ticket.bookingStatus] = (acc[ticket.bookingStatus] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Typical Indian train capacity (you can adjust these values)
    const totalCapacity = {
      FIRST_AC: 50,
      SECOND_AC: 100,
      THIRD_AC: 150,
      SLEEPER: 200,
      CHAIR_CAR: 100,
      GENERAL: 300,
    };

    // Calculate available seats by class
    const availableSeats = Object.entries(totalCapacity).reduce((acc, [className, capacity]) => {
      const booked = ticketsByClass[className] || 0;
      acc[className] = capacity - booked;
      return acc;
    }, {} as Record<string, number>);

    res.status(200).json({
      message: "Ticket information retrieved successfully",
      train: {
        trainNumber: train.trainNumber,
        trainName: train.trainName,
        origin: train.origin,
        destination: train.destination,
      },
      summary: {
        totalBookedTickets: bookedTickets.length,
        confirmedTickets: ticketsByStatus["CONFIRM"] || 0,
        racTickets: ticketsByStatus["RAC"] || 0,
        waitlistTickets: ticketsByStatus["WAITLIST"] || 0,
      },
      bookedTicketsByClass: ticketsByClass,
      availableSeatsByClass: availableSeats,
      totalCapacity,
    });
  } catch (error) {
    console.error("Error fetching tickets for train:", error);
    res.status(500).json({
      message: "Internal server error while fetching tickets",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
trainRoutes.get("/", getAllTrain);
trainRoutes.post("/", getTrainsBySourceAndDestination);
trainRoutes.get("/ticketsfortrain", getTicketsForTrain);