const router = require('express').Router();
const {
  getAllThoughts,
  updateThought,
  deleteThought,
  getThoughtById,
  createThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

router.route('/:thoughtId/reactions').post(addReaction);
router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);




router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
