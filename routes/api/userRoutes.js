const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

router.route('/users').get(getUsers).post(createUser);

router.route('/users/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/users/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;