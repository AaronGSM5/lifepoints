import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";

const communitySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    icon: {
      img: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      }
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

export const Community = model<CommunityDocument>("Community", communitySchema);
