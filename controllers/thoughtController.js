const { User, Thought, reactionSchema } = require("../models");
const { Schema, model, Types } = require("mongoose");
module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate("reactions");
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const onethought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");
      if (!onethought) {
        return res.status(404).json({ message: "No thought with this id" });
      }
      res.json(onethought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought created, but found no User with that ID ",
        });
      }
      res.json("Created the thought 🎉");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({
          message: "No Thought with such ID",
        });
      }

      res.json("Thought updated successfully");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      let thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json({ message: "Thought deleted with ID" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new reaction
  async createReaction(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const newReaction = {
        reactionId: new Types.ObjectId(),
        reactionBody: req.body.reactionBody,
        username: req.body.username,
        createdAt: new Date(),
      };

      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $push: { reactions: newReaction } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "No Thought with such ID",
        });
      }

      res.json("Reaction created and Thought updated successfully");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a reaction
  async deleteReaction(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.body.reactionId;

      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { reactionId: reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
