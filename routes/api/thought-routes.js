const router = require('express').Router();
const {
  getAllThoughts,
  updateThought,
  deleteThought,
  getThoughtById,
  createThought,
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);


module.exports = router;
