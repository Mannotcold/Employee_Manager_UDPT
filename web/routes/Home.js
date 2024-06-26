var express = require('express');
const { getHomepage, getProductpage } = require('../Controller/homeController')
var router = express.Router();

/* GET home page. */
router.get('/', getHomepage);
router.get('/tt', getProductpage);

module.exports = router;


