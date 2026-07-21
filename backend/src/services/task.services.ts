import { Task } from "../models/tasks.model.js";
import { Types } from "mongoose";

export const getTasks = async (
  filter: { category?: string; title?: string },
  limit: number = 10,
  nextCursor?: string
) => {
  const query: any = { active: true };

  // Filter-Logik
  if (filter.category) {
    query.category = { $in: [filter.category] };
  }
  if (filter.title) {
    // Case-insensitive Suche mit Regex
    query.title = { $regex: filter.title, $options: "i" };
  }

  // Cursor-Logik für Pagination (basierend auf ObjectId für Performanz)
  if (nextCursor) {
    query._id = { $lt: new Types.ObjectId(nextCursor) };
  }

  const tasks = await Task.find(query)
    .sort({ _id: -1 }) // Neueste Tasks zuerst
    .limit(limit + 1)   // Wir laden einen mehr, um zu prüfen, ob es eine nächste Seite gibt
    .lean();

  const hasNextPage = tasks.length > limit;
  const items = hasNextPage ? tasks.slice(0, -1) : tasks;
  const nextCursorValue = hasNextPage ? items[items.length - 1]._id : null;

  return {
    items,
    nextCursor: nextCursorValue,
    hasNextPage,
  };
};

export default { getTasks };
