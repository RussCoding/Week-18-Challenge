const {User} = require('../models');

const userController = {
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    getAllUsers(req,res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
              })
    },

    getUserById({params}, res) {
        User.findOne({_id: params.id})
            .populate({path: 'thoughts', select: '-__v'})
            .populate({path: 'friends', select: '-__v'})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'User not found!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400);
            });
    },

    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json ({message: 'User not found!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    addFriend({ params }, res) {
        User.findByIdAndUpdate(
            {_id: params.id},
            {$push: {friends: params.friendId }},
            {new: true, runValidators: true}
        )
        .select('-__v')
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },


    deleteFriend({ params }, res) {
        User.findByIdAndUpdate (
            {_id: params.id},
            {$pull: {friends: params.friendId}},
            {new: true, runValidators: true}
        )
        .select('-__v')
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = userController;