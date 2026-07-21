import { HydratedDocument, InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true },
    about: { type: String, default: "" },
    email: { type: String, required: true, unique: true },

    external_id: { type: String },

    level: { type: Number, default: 1 },

    inventory: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    profilePicture: { type: String, default: "" },

    communities: [{ type: Schema.Types.ObjectId, ref: "Community" }],

    subscription: {
      type: String,
      enum: ["free", "premium"],
      default: "free"
    },

    settings: {
      push_notifications: { type: Boolean, default: true },
      email_notifications: { type: Boolean, default: true },
      offer_notifications: { type: Boolean, default: true },
      isPrivate: { type: Boolean, default: false },
      appearance: { type: String, enum: ["bright", "dark"], default: "dark" },
      language: { type: String, enum: ["de", "en"], default: "en" }
    }
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<User>;

export const User = model("User", userSchema);
