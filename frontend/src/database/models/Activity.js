import { Model } from "@nozbe/watermelondb";
import { date, field, json, readonly, relation, text } from "@nozbe/watermelondb/decorators";

import { sanitizeJSON } from "./utils";

/**
 * @typedef {Object} ActivitySubStep
 * @property {boolean} isCompleted
 */

/**
 * @typedef {Object} Reaction
 * @property {string} userId
 * @property {string} type
 */

export default class Activity extends Model {
  static table = "activities";

  // Mit @relation kannst du direkt das User/Task-Objekt aus der DB laden
  @relation("users", "user_id") user;
  @relation("tasks", "task_id") task;

  // Wenn du nur die IDs brauchst:
  @text("user_id") userId;
  @text("task_id") taskId;
  @text("community_id") communityId;

  @text("status") status;
  @field("lifepoints") lifepoints;
  @text("proof_image") proofImage;
  @text("visibility") visibility;

  /** @type {ActivitySubStep[]} */
  @json("sub_steps_json", (raw) => sanitizeJSON(raw, [])) subSteps;

  /** @type {Reaction[]} */
  @json("reactions_json", (raw) => sanitizeJSON(raw, [])) reactions;

  @readonly @date("created_at") createdAt;
  @readonly @date("updated_at") updatedAt;
  @field("is_synced") isSynced;
}
