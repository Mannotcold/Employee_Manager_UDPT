const connection = require('../config/database');
const { getAllProfile, getProfileUserbyID, updateProfile, searchUsers, getProfileUserbyIDemployee } = require('../services/ProfileServices')
const { getRequest, updateRequest } = require('../services/RequestServices')
const { DeleteProfileUserbyID } = require('../services/LoginServives')

// timesheet 

const ViewtimesheetUser = async function (req, res, next) {

    // const userId = req.user.userId;
    try {
        let results = await getRequest();
        // console.log("ten user", userId);
        res.render('timesheet.ejs', { listUser: results });
    } catch (error) {
        console.error('Error retrieving papers:', error);
        next(error);
    }
}


// Request service

const ViewRequestUser = async function (req, res, next) {

    // const userId = req.user.userId;
    try {
        let results = await getRequest();
        // console.log("ten user", userId);
        res.render('AdminRequest.ejs', { listUser: results });
    } catch (error) {
        console.error('Error retrieving papers:', error);
        next(error);
    }
}

const postApproveRequest = async function (req, res, next) {
    try {
        // Lấy các thông tin từ request body
        let requestId = req.params.id;
        let status = 'Approved';
        let userId = req.user.userId;

        let results = await updateRequest(requestId, status, userId);;
        // Trả về phản hồi JSON thay vì redirect
        return res.json({ message: 'Request approved successfully!', results: results });
    } catch (error) {
        console.error(">>>Error: ", error);
        next(error);
    }
};


const postDisapproveRequest = async function (req, res, next) {
    try {
        // Lấy các thông tin từ request body
        let requestId = req.params.id;
        let status = 'Disapproved';
        let userId = req.user.userId;

        let results = await updateRequest(requestId, status, userId);;
        // Trả về phản hồi JSON thay vì redirect
        return res.json({ message: 'Request approved successfully!', results: results });
    } catch (error) {
        console.error(">>>Error: ", error);
        next(error);
    }
};





// Profile service


const getProfileUser = async function (req, res, next) {

    const Id = req.user.userId;
    let User = await getProfileUserbyIDemployee(Id);
    // console.log(Id);
    res.render('AdminProfile.ejs', { listProfile: User });
}


const ViewProfileUser = async function (req, res, next) {
    // const userId = req.user.userId;
    try {
        // console.log("asafsfsafsa", userId);
        let results = await getAllProfile();
        res.render('ViewProfile.ejs', { listUser: results });
    } catch (error) {
        console.error('Error retrieving papers:', error);
        next(error);
    }
}

const getUpdateUser = async function (req, res, next) {

    const Id = req.params.id;
    // console.log(Id);
    let User = await getProfileUserbyID(Id);
    console.log(User);
    res.render('UpdateProfileUser.ejs', { listProfile: User });
}

const postUpdateProfile = async function (req, res, next) {
    try {
        // Lấy ID từ URL
        let ID = req.body.id;
        // Lấy các thông tin từ request body
        let employeeID = req.body.employee_id;
        let name = req.body.name;
        let dob = req.body.dob;
        let gender = req.body.gender;
        let citizenID = req.body.citizen_id;
        let taxCode = req.body.tax_code;
        let address = req.body.address;
        let phone = req.body.phone;
        let email = req.body.email;
        let bankAccount = req.body.bank_account;
        let pointReward = req.body.point_reward;

        // Ghi log thông tin nhận được
        console.log(">>>req.body: ", req.body);

        // Thực hiện cập nhật thông tin nhân viên thông qua hàm updateProfile
        let results = await updateProfile(ID, employeeID, name, dob, gender, citizenID, taxCode, address, phone, email, bankAccount, pointReward);

        // Trả về phản hồi JSON thay vì redirect
        res.redirect(`/adminhome/ViewProfile`)
    } catch (error) {
        console.error("Error updating profile:", error);
        next(error);
    }
};





const postDeleteUser = async function (req, res, next) {

    const UserId = req.params.id;
    console.log(UserId);
    let User = await DeleteProfileUserbyID(UserId);
    res.redirect(`/adminhome`)
}

const getSearch = async function (req, res, next) {
    try {
        let keyword = req.query.keyword; // Lấy từ khoá tìm kiếm từ query params
        let category = req.query.category; // Lấy giá trị category từ query params
        console.log(category);
        let results = await searchUsers(keyword, category); // Hàm searchPapers sẽ thực hiện truy vấn tìm kiếm dựa trên từ khoá và category
        console.log(results);
        // // Trả về dữ liệu dưới dạng HTML fragment để render trong trang HTML
        res.render('UserListSearch.ejs', { listUser: results }, (err, html) => {
            if (err) {
                console.error('Error rendering paper list:', err);
                res.status(500).send('Error rendering paper list');
            } else {
                res.send(html);
            }
        });
    } catch (error) {
        console.error('Error retrieving papers:', error);
        next(error);
    }
}



module.exports = {
    ViewProfileUser, getSearch, getUpdateUser, postUpdateProfile, postDeleteUser, ViewRequestUser, postApproveRequest, postDisapproveRequest, getProfileUser, ViewtimesheetUser
}