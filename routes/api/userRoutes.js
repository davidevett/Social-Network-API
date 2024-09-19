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

router.route('/user').get(getUsers).post(createUser);

router.route('/user/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/user/:userId/friend/:friendId').put(addFriend).delete(deleteFriend);

module.exports = router;