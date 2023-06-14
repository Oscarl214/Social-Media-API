const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
// Schema to create User model
const thougtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 280,
    }, //there to ensure the strings you save through the schema are properly trimmed-Stack OverFlow
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toISOString().split("T")[0],
    },
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Created a virtual that gets total amount of friends
thougtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our User model
const Thought = model("Thought", thougtSchema);

module.exports = Thought;
