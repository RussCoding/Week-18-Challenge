const router = require('express').Router();

const { createUser, getAllUsers, getUserById, updateUser, deleteUser, addFriend, deleteFriend} = require('../../controllers/user-controller');
// get and post for all users
router.route('/').get(getAllUsers).post(createUser);
//get and update for specific user by id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);
//routes for adding and removing friends
router.route('/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;