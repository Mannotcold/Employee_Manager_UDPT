var express = require('express');
const { getRegisterpage, postRegisterpage } = require('../Controller/homeController')
var router = express.Router();

// /* GET register page. */
router.get('/', getRegisterpage);
router.post('/Create_user', postRegisterpage);
// router.post('/Register/Create_user', getRegisterpage);
module.exports = router;
