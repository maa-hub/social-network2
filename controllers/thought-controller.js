const { User, Thought} = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .sort({ createdAt: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    },

    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .populate({
                path: 'user',
                select: '-__v'
            })
           .select('-__v')
           .then(dbThoughtData => res.json(dbThoughtData))
           .catch(err => {
               console.log(err);
               res.status(500).json(err)
           })
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id}) => {
                return User.findOneAndUpdate(
                    { username: body.username },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this username!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    addReaction ({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this ID!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },

    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },


    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, 
            body,
            { new: true, runValidators: true }
        )
        .then(updatedThought => {
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with this ID!' });
            }
        res.json(updatedThought);
        })
        .catch(err => res.json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this ID'})
            }
            res.json(deletedThought);
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController
