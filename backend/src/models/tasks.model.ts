import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
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
  }
});

module.exports = mongoose.model("Tasks", taskSchema);
