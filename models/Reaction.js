const { Schema, model } = require("mongoose");

// Schema to create User model
const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
    reactionbody: {
      type: String,
      required: true,
      maxLength: 280,
    }, //there to ensure the strings you save through the schema are properly trimmed-Stack OverFlow
  },
  {
    username: {
      type: String,
      required: true,
    },
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
      getters:true,
    },
    id: false,
  }
);



// Initialize our User model
const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;