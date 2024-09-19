
const { Thought, User } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.findAll();
      res.json(thoughts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },
  async getSingleThought(req, res) {
    try {
      const thoughts = await Thought.findOne({ _id: req.params.thoughts.id });
      if (!thoughts) {
        return res.status(404).json({ error: "Thought not found" });
      }
      res.json(thoughts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },
  async createThought(req, res) {
    try {
      const user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const thought = await Thought.create({
        ...req.body,
        userId: req.body.userId,
      });
      res.status(201).json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughts.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughts.id });
      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }
      res.json({ message: "Thought deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },
  async createReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughts.id);
      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }
      thought.reactions.push(req.body);
      await thought.save();
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughts.id);
      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }
      thought.reactions = thought.reactions.filter(
        (reaction) => reaction._id.toString()!== req.params.reactionId
      );
      await thought.save();
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },
};
