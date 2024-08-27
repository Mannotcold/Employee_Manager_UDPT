const connection = require('../config/database');
const { getRequest, updateRequest } = require('../services/RequestServices')
const { getAllProfile, searchUsers, getProfileUserbyID, DeleteProfileUserbyID } = require('../services/LoginServives')


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

const postUpdateProfile = async function (req, res, next) {
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

    // Thực hiện câu lệnh SQL để cập nhật thông tin nhân viên
    const [results, fields] = await connection.query(`
        UPDATE Employees 
        SET 
            name = ?, 
            dob = ?, 
            gender = ?, 
            citizen_id = ?, 
            tax_code = ?, 
            address = ?, 
            phone = ?, 
            email = ?, 
            bank_account = ?, 
            point_reward = ? 
        WHERE 
            employee_id = ?`,
        [name, dob, gender, citizenID, taxCode, address, phone, email, bankAccount, pointReward, employeeID]
    );

    // Ghi log kết quả của câu lệnh SQL
    console.log(">>>results: ", results);

    // Chuyển hướng về trang quản lý nhân viên hoặc trang khác phù hợp
    return res.redirect('/adminhome/ViewProfile');
}


const getUpdateUser = async function (req, res, next) {

    const UserId = req.params.id;
    // console.log(UserId);
    let User = await getProfileUserbyID(UserId);
    console.log(User);
    res.render('UpdateProfileUser.ejs', { listProfile: User });
}

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
    ViewProfileUser, getSearch, getUpdateUser, postUpdateProfile, postDeleteUser, ViewRequestUser, postApproveRequest, postDisapproveRequest
}