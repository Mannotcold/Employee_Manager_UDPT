var express = require('express');
const { verifyToken, verifyRole } = require('../Middleware/verifyToken');
const { HomeUser, UserRequest, PostUserRequest, getProfileUser, getUpdateUser, postUpdateProfile } = require('../Controller/userController')

var router = express.Router();


router.get('/profile', verifyToken, verifyRole('employee'), getProfileUser);
router.get('/profile/:id', getUpdateUser);//lấy user cần update
router.post('/profile/UpdateProfile', postUpdateProfile);//update user

// /* Request page. */
router.get('/', verifyToken, verifyRole('employee'), HomeUser);
router.get('/YourRequest', verifyToken, verifyRole('employee'), UserRequest);
router.post('/SendRequest', verifyToken, verifyRole('employee'), PostUserRequest);

module.exports = router;
