import { Model } from "@nozbe/watermelondb";
import { field, text, json, date } from "@nozbe/watermelondb/decorators";
import { sanitizeJSON } from "./utils";

export default class Activity extends Model {
  static table = "activities";

  @text("user_id") userId;
  @text("task_id") taskId;
  @text("status") status;
  @field("lifepoints") lifepoints;
  @text("proof_image") proofImage;
  @text("community_id") communityId;
  @text("visibility") visibility;

  // Beide nutzen jetzt dieselbe universelle Funktion
  @json("sub_steps_json", (raw) => sanitizeJSON(raw, [])) subSteps;
  @json("reactions_json", (raw) => sanitizeJSON(raw, [])) reactions;

  @date("created_at") createdAt;
  @date("updated_at") updatedAt;
  @field("is_synced") is_synced;
}
