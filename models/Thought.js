const { Schema, Types, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Please leave a Thought',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);


module.exports = Thought;
module.exports = reactionSchema;
