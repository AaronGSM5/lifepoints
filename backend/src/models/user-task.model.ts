import mongoose from 'mongoose';

const userTaskSchema = new mongoose.Schema({
    taskStarted: {
      type: String,
      required: true,
    },
    taskFinished: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'done', 'abandoned']
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    lifepoints: {
      type: Number,
      required: true
    },
    proof: {
      type: mongoose.Schema.Types.Mixed,
    },
}, {
  timestamps: true
});

export default mongoose.model('userTask', userTaskSchema);