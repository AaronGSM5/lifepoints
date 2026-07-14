import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";

const activitySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true
    },
    status: {
      type: String,
      enum: ["active", "done", "abandoned"]
    },
    lifepoints: {
      type: Number,
      required: true
    },
    proofImage: {
      type: String,
      default: null
    },
    communityId: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      default: null
    },
    visibility: {
      type: String,
      enum: ["private", "friends", "public"], // based on userSettings, might change
      default: "public"
    },
    reactions: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        type: String
      }
    ]
  },
  { timestamps: true }
);

activitySchema.index({ userId: 1, createdAt: -1, communityId: 1 });

export type Activity = InferSchemaType<typeof activitySchema>;
export type ActivityDocument = HydratedDocument<Activity>;

export const Activity = model("Activity", activitySchema);