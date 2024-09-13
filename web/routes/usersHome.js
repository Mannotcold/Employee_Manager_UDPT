var express = require('express');
const { verifyToken, verifyRole } = require('../Middleware/verifyToken');
const { HomeUser, UserRequest, PostUserRequest, getProfileUser, getUpdateUser, postUpdateProfile,
     timesheetRequest, updatetimesheetRequest, PostTimesheetRequest, PostUserActivity, ViewUserActivity, HomeActivityUser,
    getEmployeePoints, redeemVoucher, getEmployeeHistory } = require('../Controller/userController')

var router = express.Router();

router.get('/', verifyToken, verifyRole('employee'), getProfileUser);
router.get('/profile', verifyToken, verifyRole('employee'), getProfileUser);
router.get('/profile/:id', getUpdateUser);//lấy user cần update
router.post('/profile/UpdateProfile', postUpdateProfile);//update user

// /* Request page. */
router.get('/Request', verifyToken, verifyRole('employee'), HomeUser);
router.get('/YourRequest', verifyToken, verifyRole('employee'), UserRequest);
router.post('/SendRequest', verifyToken, verifyRole('employee'), PostUserRequest);

//Time sheet
router.get('/Timesheet', verifyToken, verifyRole('employee'), timesheetRequest);
router.get('/UpdateTimesheet/:id', verifyToken, verifyRole('employee'), updatetimesheetRequest);
router.post('/UpdateRequest', verifyToken, verifyRole('employee'), PostTimesheetRequest);


//Trang Activity
router.get('/Activity', verifyToken, verifyRole('employee'), HomeActivityUser);
router.get('/YourActivity', verifyToken, verifyRole('employee'), ViewUserActivity);
router.post('/SendActivity', verifyToken, verifyRole('employee'), PostUserActivity);


router.get('/employee/reward', verifyToken, verifyRole('employee'), getEmployeePoints);


// Đổi voucher
router.post('/employee/redeemVoucher', verifyToken, verifyRole('employee'), redeemVoucher);


router.get('/employee/history', verifyToken, verifyRole('employee'), getEmployeeHistory);
module.exports = router;
