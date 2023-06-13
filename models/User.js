const { Schema, model } = require("mongoose");
const Thought = require("./Thought");

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    }, //there to ensure the strings you save through the schema are properly trimmed-Stack OverFlow
  },
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/], //RegEx Email expression
    },
  },
  {
    thoughts: {
      totalthoughts: [Thought],
    },
  },
  {
    friends: {
      totalfriends: [User],
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
userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return this.friends.totalfriends.length;
  });

// Initialize our User model
const User = model("user", userSchema);

module.exports = User;
