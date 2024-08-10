var express = require('express');
const { getAdminpage, getRegisterpage, postRegisterpage, getedituserpage, postUpdatepage, postDeletepage } = require('../Controller/homeController')
const { ViewProfileUser, getSearch, getUpdateUser, postUpdateProfile, postDeleteUser, ViewRequestUser } = require('../Controller/adminController')

var router = express.Router();

// /* GET register page. */
router.get('/', getAdminpage);
router.get('/Register', getRegisterpage);

//Trang quản lý profile
router.get('/ViewProfile', ViewProfileUser);
router.get('/search', getSearch);
router.get('/ViewProfile/SearchUser/:id', getUpdateUser);
router.post('/ViewProfile/DeleteUser/:id', postDeleteUser);
router.post('/ViewProfile/UpdateProfile', postUpdateProfile);

//Trang quản lý request
router.get('/request', ViewRequestUser);


router.post('/Register/Create_user', postRegisterpage);
router.post('/edit_user/Update_user', postUpdatepage);
router.post('/delete_user/:id', postDeletepage);
router.get('/edit_user/:id', getedituserpage);

// router.post('/Register/Create_user', getRegisterpage);
module.exports = router;
