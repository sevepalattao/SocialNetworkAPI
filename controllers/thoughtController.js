const User = require('../models/user');
const Thought = require('../models/thought');
const Reaction = require('../models/reaction');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
          .then((thoughtData) => res.json(thoughtData))
          .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId})
          .populate({ path: 'reactions', select: '-__v' })
          .then((thoughtData) => 
            !thoughtData
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
          .then((thoughtData) => res.json(thoughtData))
          .catch((err) => res.status(500).json(err))
            User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtData._id }},
                { new: true }
            )
            .then((user) => 
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
          .then((thoughtData) => 
          !thoughtData
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thoughtData)
          )
          .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thoughtData) =>
          !thoughtData
            ? res.status(404).json({ message: 'No thought with that id!' })
            : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err));
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.params.body }},
            { new: true }
        )
          .then((thoughtData) =>
          !thoughtData
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.params.reactionId }},
            { new: true }
        )
          .then((thoughtData) => 
          !thoughtData
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err));
    }
}