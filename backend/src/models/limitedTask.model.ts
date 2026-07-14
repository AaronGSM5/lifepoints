import { HydratedDocument, InferSchemaType, Schema, model } from "mongoose";

const limitedTaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true
    },
    communityId: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      default: null
    },
    maxParticipants: {
      type: Number,
      required: true
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    startDate: { type: Date },
    endDate: { type: Date },
    bonusLifepoints: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Index für schnelle Abfragen in Communities
limitedTaskSchema.index({ communityId: 1, isActive: 1 });

export type LimitedTask = InferSchemaType<typeof limitedTaskSchema>;
export type LimitedTaskDocument = HydratedDocument<LimitedTask>;

export const LimitedTask = model("LimitedTask", limitedTaskSchema);
