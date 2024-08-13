var express = require('express');
const { HomeUser } = require('../Controller/userController')

var router = express.Router();

// /* GET register page. */
router.get('/', HomeUser);

module.exports = router;
