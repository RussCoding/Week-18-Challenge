const router = require('express').Router();

//gets all methods from Thought

const { createThought, getAllThoughts, getThoughtById, updateThought, deleteThought, createReaction, deleteReaction} = require('../../controllers/thought-controller');
//create thought
router.route('/:userId').post(createThought);
// get for all thoughts
router.route('/').get(getAllThoughts);
// individual thoughts
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);
// reactions
router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/reactionId').delete(deleteReaction);

module.exports = router;