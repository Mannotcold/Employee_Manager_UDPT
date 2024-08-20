var express = require('express');
const axios = require('axios');
const { getAdminpage, getRegisterpage, postRegisterpage, getedituserpage, postUpdatepage, postDeletepage } = require('../Controller/homeController')
const { ViewProfileUser, getSearch, getUpdateUser, postUpdateProfile, postDeleteUser, ViewRequestUser, postApproveRequest, postDisapproveRequest } = require('../Controller/adminController')

var router = express.Router();

router.get('/api-gateway/nhanvien', async (req, res, next) => {
    try {
        const response = await axios.get('http://localhost:8080/api/nhanvien');
        res.json(response.data);
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching data from API Java:', error);
        res.status(500).json({ error: 'Failed to fetch data from API Java' });
    }
});


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
router.post('/request/Approve/:id', postApproveRequest);
router.post('/request/Disapprove/:id', postDisapproveRequest);


router.post('/Register/Create_user', postRegisterpage);
router.post('/edit_user/Update_user', postUpdatepage);
router.post('/delete_user/:id', postDeletepage);
router.get('/edit_user/:id', getedituserpage);

// router.post('/Register/Create_user', getRegisterpage);
module.exports = router;
