import { HydratedDocument, InferSchemaType, Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    subSteps: [
      {
        description: { type: String, required: true },
        isCompleted: { type: Boolean, default: false }
      }
    ],
    lifepoints: {
      type: Number,
      default: 0
    },
    category: {
      type: [String],
      default: []
    },
    active: {
      type: Boolean,
      default: true
    },
    image: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    custom: {
      type: Object,
      default: {}
    },
    estimated_time: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

export type Task = InferSchemaType<typeof taskSchema>;
export type TaskDocument = HydratedDocument<Task>;

export const Task = model("Tasks", taskSchema);
