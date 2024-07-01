var express = require('express');
const { getLoginpage } = require('../Controller/homeController')
var router = express.Router();

// /* GET login page. */
router.get('/', getLoginpage);
// router.get('/register', getRegisterpage);
module.exports = router;
