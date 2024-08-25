var express = require('express');
const { verifyToken, verifyRole } = require('../Middleware/verifyToken');
const { HomeUser, UserRequest } = require('../Controller/userController')

var router = express.Router();

// /* GET register page. */
router.get('/', verifyToken, verifyRole('employee'), HomeUser);
router.get('/YourRequest', verifyToken, verifyRole('employee'), UserRequest);

module.exports = router;
