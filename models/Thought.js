const { Schema, Types, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Please leave a Thought',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);


const Thought = model('Thought', thoughtSchema);


module.exports = Thought;
