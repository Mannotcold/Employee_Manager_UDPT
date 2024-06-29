var express = require('express');
const { getLoginpage, getProductpage } = require('../Controller/homeController')
var router = express.Router();

/* GET login page. */
router.get('/', getLoginpage);
router.get('/ty', getProductpage);
module.exports = router;

``
