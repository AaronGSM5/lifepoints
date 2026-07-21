import { Request, Response, NextFunction } from "express";
import * as activityService from "../services/activity.services";
import { checkParameters } from "@/services/utils";

const startTaskActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId, communityId } = req.body;
    const userId = req.user.targets.id;

    checkParameters({ taskId, userId });

    const activity = await activityService.startActivity(userId, taskId, communityId);

    res.status(201).json({ success: true, data: activity });
  } catch (error) {
    next(error);
  }
};

const finishTaskActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { activityId, status } = req.params;
    const userId = req.user.targets.id;

    checkParameters({ status, activityId, userId });

    const activity = await activityService.finishTaskActivity(userId, activityId, status);

    res.status(200).json({ success: true, data: activity });
  } catch (error) {
    next(error);
  }
};

export default { startTaskActivity, finishTaskActivity };
