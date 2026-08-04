import { Model } from "@nozbe/watermelondb";
import { date, field, json, text } from "@nozbe/watermelondb/decorators";

import { sanitizeJSON } from "./utils";

/**
 * @typedef {Object} TaskSubStep
 * @property {string} title
 * @property {string} [description]
 */

export default class Task extends Model {
  static table = "tasks";

  @text("title") title;
  @text("description") description;
  @field("lifepoints") lifepoints;
  @field("active") active;
  @text("image") image;
  @text("icon") icon;
  @field("estimated_time") estimatedTime;

  /** @type {TaskSubStep[]} */
  @json("sub_steps_json", (raw) => sanitizeJSON(raw, [])) subSteps;

  /** @type {string[]} */
  @json("category_json", (raw) => sanitizeJSON(raw, [])) category;

  /** @type {Object} */
  @json("custom_json", (raw) => sanitizeJSON(raw, {})) custom;

  @date("created_at") createdAt;
  @date("updated_at") updatedAt;
}
