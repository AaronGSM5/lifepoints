import { Schema, model, InferSchemaType, HydratedDocument  } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    pointMultiplier: {
      type: Number,
      default: 1.0
    },

    affectedCategories: [
      {
        type: String
      }
    ],

    // Events can have a set of limited Tasks
    limitedTasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "LimitedTask"
      }
    ],

    isActive: {
      type: Boolean,
      default: true
    },
    bannerImage: { type: String }
  },
  { timestamps: true }
);

// Index für effizientes Finden laufender Events
eventSchema.index({ startDate: 1, endDate: 1 });

export type Event = InferSchemaType<typeof eventSchema>;
export type EventDocument = HydratedDocument<Event>;

export const Event = model("Event", eventSchema);
