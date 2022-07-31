const {User} = require('../models');

const userController = {
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    getAllUsers(req,res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch (err => res.status(400).json(err))
    },

    getUserById({params}, res) {
        User.findOne({_id: params._id})
            .populate({path: 'thoughts', select: '-__v'})
            .populate({path: 'frends', select: '-__v'})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'User not found!'});
                    return;
                }
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    
}

