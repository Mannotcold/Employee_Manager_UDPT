var express = require('express');
const axios = require('axios');
const { getAdminpage, getRegisterpage, postRegisterpage, getedituserpage, postUpdatepage, postDeletepage } = require('../Controller/homeController')
const { ViewProfileUser, getSearch, getUpdateUser, postUpdateProfile, postDeleteUser, ViewRequestUser, postApproveRequest, postDisapproveRequest, getProfileUser, ViewtimesheetUser } = require('../Controller/adminController')
const { verifyToken, verifyRole } = require('../Middleware/verifyToken');
var router = express.Router();



// /* GET register page. */
router.get('/', verifyToken, verifyRole('admin'), getProfileUser);
router.get('/user', verifyToken, verifyRole('admin'), getAdminpage);
router.get('/Register', getRegisterpage);

//Trang quản lý profile
router.get('/ViewProfile', ViewProfileUser);
router.get('/search', getSearch);
router.get('/ViewProfile/SearchUser/:id', getUpdateUser);//lấy user cần update
router.post('/ViewProfile/UpdateProfile', postUpdateProfile);//update user

router.post('/ViewProfile/DeleteUser/:id', postDeleteUser);

//Trang quản lý request
router.get('/request', verifyToken, verifyRole('admin'), ViewRequestUser);
router.post('/request/Approve/:id', verifyToken, verifyRole('admin'), postApproveRequest);
router.post('/request/Disapprove/:id', verifyToken, verifyRole('admin'), postDisapproveRequest);

//Trang quản lý timesheet
router.get('/timesheet', verifyToken, verifyRole('admin'), ViewtimesheetUser);




router.post('/Register/Create_user', postRegisterpage);
router.post('/edit_user/Update_user', postUpdatepage);
router.post('/delete_user/:id', postDeletepage);
router.get('/edit_user/:id', getedituserpage);

// router.post('/Register/Create_user', getRegisterpage);
module.exports = router;
