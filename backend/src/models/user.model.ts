import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true },
    about: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    
    level: { type: Number, default: 1 },
    
    inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    profilePicture: { type: String, default: "" },
    
    communities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }],
    
    subscription: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free'
    },
    
    settings: {
      push_notifications: { type: Boolean, default: true },
      email_notifications: { type: Boolean, default: true },
      offer_notifications: { type: Boolean, default: true },
      isPrivate: { type: Boolean, default: false },
      appearance: { type: String, enum: ["bright", "dark"], default: "dark" },
      language: { type: String, enum: ["de", "en"], default: "de" }
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);