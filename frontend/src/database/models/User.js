import { Model } from "@nozbe/watermelondb";
import { date, field, json, text } from "@nozbe/watermelondb/decorators";

/**
 * @typedef {Object} UserSettings
 * @property {boolean} push_notifications
 * @property {boolean} email_notifications
 * @property {boolean} offer_notifications
 * @property {boolean} isPrivate
 * @property {'bright' | 'dark'} appearance
 * @property {'de' | 'en'} language
 * @property {boolean} activityVisibility
 */

export default class User extends Model {
  static table = "users";

  @text("username") username;
  @text("name") name;
  @text("about") about;
  @text("email") email;
  @text("external_id") externalId;
  @field("level") level;
  @field("lifepoints") lifepoints; // NOTE: validate using server on every update
  @json("inventory", (json) => json) inventory;
  @text("profile_picture") profilePicture;
  @json("communities", (json) => json) communities;
  @text("subscription") subscription;
  /** @type {UserSettings} */
  @json("settings", (json) => json) settings;
  @date("created_at") createdAt;
  @date("updated_at") updatedAt;
}
