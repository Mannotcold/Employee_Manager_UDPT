var express = require('express');
const axios = require('axios');
const { getAdminpage, getRegisterpage, postRegisterpage, getedituserpage, postUpdatepage, postDeletepage } = require('../Controller/homeController')
const { ViewProfileUser, getSearch, getUpdateUser, postUpdateProfile, postDeleteUser, ViewRequestUser, postApproveRequest, postDisapproveRequest, getProfileUser, ViewtimesheetUser, ViewAdminActivity, givePoints, monthlyReward, getAdminHistory } = require('../Controller/adminController')
const { verifyToken, verifyRole } = require('../Middleware/verifyToken');
var router = express.Router();

const adminController = require('../Controller/adminController');


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

//Trang Activity
router.get('/Activity', verifyToken, verifyRole('admin'), ViewAdminActivity);


router.post('/Register/Create_user', postRegisterpage);
router.get('/Create/:id', getedituserpage);


router.post('/edit_user/Update_user', postUpdatepage);
router.post('/delete_user/:id', postDeletepage);


// Xem lịch sử giao dịch
router.get('/admin/history',verifyToken, verifyRole('admin') , getAdminHistory);

// Route để render form nhập điểm thưởng hàng tháng
router.get('/admin/monthlyRewardForm', verifyToken, verifyRole('admin'), (req, res) => {
    res.render('rewardPage', { message: null }); // Truyền message là null để tránh lỗi undefined
});
router.post('/admin/monthlyReward', verifyToken, verifyRole('admin'), monthlyReward);


// Route xử lý logic tặng điểm
router.get('/admin/givePointsForm', verifyToken, verifyRole('admin'), (req, res) => {
    res.render('givePointsPage', { message: null });
});

router.post('/admin/givePoints', verifyToken, verifyRole('admin'), givePoints);


// router.post('/Register/Create_user', getRegisterpage);
module.exports = router;
