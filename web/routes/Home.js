var express = require('express');
const { getHomepage, getProductpage } = require('../Controller/homeController')
var router = express.Router();

/* GET home page. */
router.get('/', getHomepage);
router.get('/tt', getProductpage);

// router.post('/Create_user', getProductpage);
module.exports = router;


