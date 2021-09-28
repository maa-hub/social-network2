const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,

} = require('../../controllers/user-controller');

router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/').get(getAllUsers).post(createUser);


module.exports = router;
