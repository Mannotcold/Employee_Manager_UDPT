var express = require('express');
const { getAdminpage, getRegisterpage, postRegisterpage } = require('../Controller/homeController')
var router = express.Router();

// /* GET register page. */
router.get('/', getAdminpage);
router.get('/Register', getRegisterpage);
router.post('/Register/Create_user', postRegisterpage);
// router.post('/Register/Create_user', getRegisterpage);
module.exports = router;
