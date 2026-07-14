import { NextFunction, Request, Response } from "express";
import TaskServices from "../services/task.services.js";

// const getUsersActiveTasks = async (req, res) => {
//   const { id } = { id: "65f1a2b3c4d5e6f7a8b90123" }; // Should be pulled from access token later

//   const data = await UserTasksServices.getUsersActiveTasks(id);

//   res.status(200).json(data);
// };

// const getUsersTaskHistory = async (req, res) => {
//   const { id } = { id: "65f1a2b3c4d5e6f7a8b90123" }; // Should be pulled from access token later

//   const data = await UserTasksServices.getUsersTaskHistory(id);

//   res.status(200).json(data);
// };

// const getTasks = async (req, res) => {
//   const { filter } = req.query;

//   console.log(filter);

//   const data = TaskServices.getTasks({ filter });

//   res.status(200).json(data);
// };

const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Extraktion der Query-Parameter
    const { category, title, limit, nextCursor } = req.query;

    // 2. Validierung / Vorbereitung der Filter
    const filter = {
      category: category as string | undefined,
      title: title as string | undefined,
    };

    const parsedLimit = limit ? parseInt(limit as string, 10) : 10;
    const cursor = nextCursor as string | undefined;

    // 3. Aufruf des Service-Layers
    const result = await TaskServices.getTasks(filter, parsedLimit, cursor);

    // 4. Rückgabe der Antwort
    res.status(200).json({
      data: result.items,
      pagination: {
        nextCursor: result.nextCursor,
        hasNextPage: result.hasNextPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default { getTasks }