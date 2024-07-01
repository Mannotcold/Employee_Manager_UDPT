var express = require('express');
const {getRegisterpage } = require('../Controller/homeController')
var router = express.Router();

// /* GET login page. */
router.get('/', getRegisterpage);
module.exports = router;
