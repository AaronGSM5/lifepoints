const mongoose = require('mongoose');

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
      type: String,
      required: true
    },
    proof: {
      type: String,
    },
}, {
  timestamps: true
});

module.exports = mongoose.model('userTask', userTaskSchema);