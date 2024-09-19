
const { User } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.findall();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getSingleUser(req, res) {
    try {
      const users = await User.findOne({ _id: req.params.userId });
      if (!users) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async createUser(req, res) {
    try {
      const user = new User(req.body);
      const result = await user.save();
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $pull: { user: req.params.userId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.body } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndDelete(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
