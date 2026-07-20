import { Request, Response, NextFunction } from "express";
import * as activityService from "../services/activity.services";

const startActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId, communityId } = req.body;
    const userId = req.user!.id; // User-id aus Auth middleware soon

    const activity = await activityService.startActivity(userId, taskId, communityId);
    res.status(201).json({ success: true, data: activity });
  } catch (error) {
    next(error);
  }
};

const finishTaskActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, proofImage } = req.body;
    const { id } = req.params;

    if (!["done", "abandoned"].includes(status)) {
      return res.status(400).json({ message: "Ungültiger Status" });
    }

    const activity = await activityService.finishTaskActivity(id, status, proofImage);
    res.status(200).json({ success: true, data: activity });
  } catch (error) {
    next(error);
  }
};

export default { startActivity, finishTaskActivity };
