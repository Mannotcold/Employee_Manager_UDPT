var express = require('express');
const { verifyToken, verifyRole } = require('../Middleware/verifyToken');
const { HomeUser, UserRequest, PostUserRequest } = require('../Controller/userController')

var router = express.Router();

// /* Request page. */
router.get('/', verifyToken, verifyRole('employee'), HomeUser);
router.get('/YourRequest', verifyToken, verifyRole('employee'), UserRequest);
router.get('/SendRequest', verifyToken, verifyRole('employee'), PostUserRequest);

module.exports = router;
