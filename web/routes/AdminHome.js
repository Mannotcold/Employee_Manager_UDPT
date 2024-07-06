var express = require('express');
const { getAdminpage, getRegisterpage, postRegisterpage, getedituserpage, postUpdatepage } = require('../Controller/homeController')
var router = express.Router();

// /* GET register page. */
router.get('/', getAdminpage);
router.get('/Register', getRegisterpage);
router.post('/Register/Create_user', postRegisterpage);
router.post('/edit_user/Update_user', postUpdatepage);
router.get('/edit_user/:id', getedituserpage);
// router.post('/Register/Create_user', getRegisterpage);
module.exports = router;
