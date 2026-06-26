import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";

const communitySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    icon: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    memberCount: {
      type: Number,
      required: true,
      default: 1
    },
    categories: {
      type: [String],
      required: true,
      default: []
    }
  },
  {
    timestamps: true
  }
);

export type Community = InferSchemaType<typeof communitySchema>;

export type CommunityDocument = HydratedDocument<Community>;

// 3. Create and export the Model
export const CommunityModel = model<CommunityDocument>("Community", communitySchema);
