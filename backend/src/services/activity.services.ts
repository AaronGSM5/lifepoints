import { Activity } from "../models/activity.model";
import { Task } from "../models/tasks.model";
import { User } from "../models/user.model";
import { Types, startSession } from "mongoose";

export const startActivity = async (userId: string, taskId: string, communityId?: string) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("task not found");

  const activity = new Activity({
    userId: new Types.ObjectId(userId),
    taskId: new Types.ObjectId(taskId),
    status: "active",
    lifepoints: task.lifepoints,
    communityId: communityId ? new Types.ObjectId(communityId) : null
  });

  return await activity.save();
};

export const finishTaskActivity = async (
  userId: string,
  activityId: string | string[],
  status: "done" | "abandoned"
) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const activity = await Activity.findOne({ _id: activityId, userId }).session(session);
    if (!activity) throw new Error("Aktivität nicht gefunden");
    if (activity.status !== "active") throw new Error("Aktivität wurde bereits bearbeitet");

    const updateData: any = { status };
    let pointsToAward = 0;

    if (status === "done") {
      pointsToAward = activity.lifepoints;

      updateData.lifepoints = pointsToAward;
    }

    const updatedActivity = await Activity.findByIdAndUpdate(activityId, updateData, { new: true, session });

    if (status === "done" && pointsToAward > 0) {
      await User.findByIdAndUpdate(activity.userId, { $inc: { lifepoints: pointsToAward } }, { session });
    }

    await session.commitTransaction();
    return updatedActivity;
  } catch (error) {
    // reset if an issue happends
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
