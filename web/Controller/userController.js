const connection = require('../config/database');
const {  } = require('../Middleware/verifyToken')
const { ViewUserRequest, SendUserRequest } = require('../services/RequestServices')
const { getProfileUserbyIDemployee, getProfileUserbyID, updateProfile } = require('../services/ProfileServices')
const jwt = require('jsonwebtoken');
const SECRET_KEY = '123456';
const bcrypt = require('bcrypt');


// Login service
let handleLogin = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        });
    }

    try {
        // Kiểm tra username có tồn tại trong cơ sở dữ liệu
        let [results, fields] = await connection.query('SELECT * FROM Accounts WHERE username = ? ', [username]);
        if (results.length === 0) {
            return res.status(404).json({
                errCode: 2,
                message: 'User not found!'
            });
        }

        let user = results[0];
        // So sánh mật khẩu
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(401).json({
                errCode: 3,
                message: 'Incorrect password!'
            });
        }

        // Tạo JWT
        let token = jwt.sign(
            {
                userId: user.id_accounts,
                username: user.username,
                userType: user.role
            },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Lưu token vào cookie
        res.cookie('token', token, {
            httpOnly: true, // Ngăn chặn truy cập từ client-side JavaScript
            secure: false, // Đặt thành true nếu sử dụng HTTPS
            sameSite: 'strict' // Ngăn chặn các yêu cầu từ các trang web khác
        });

        if (user.role === "admin") {
            return res.redirect('/adminhome');
        }
        if (user.role === "employee") {
            return res.redirect('/usersHome');
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            errCode: 4,
            message: 'Internal server error!'
        });
    }
}


// Profile service
const getProfileUser = async function (req, res, next) {
    
    const Id = req.user.userId;
    let User = await getProfileUserbyIDemployee(Id);
    console.log(User);
    res.render('UserProfile.ejs', { listProfile: User });
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
        res.redirect(`/userhome`)
    } catch (error) {
        console.error("Error updating profile:", error);
        next(error);
    }
};

// Request service*
const HomeUser = async function (req, res, next) {
    try {
        res.render('UserSendRequest.ejs');
    } catch (error) {
        console.error('Error retrieving papers:', error);
        next(error);
    }
}

const UserRequest = async function (req, res, next) {
    const userId = req.user.userId;
    try {
        let results = await ViewUserRequest(userId);
        // console.log("ten user", userId);
        res.render('UserRequest.ejs', { listUser: results });
    } catch (error) {
        console.error('Error retrieving papers:', error);
        next(error);
    }
}

const PostUserRequest = async function (req, res, next) {
    const { request_type, request_date, notes } = req.body;
    let status = "Pending"
    const userId = req.user.userId;  // Lấy userId từ form

    let User = await SendUserRequest(userId, request_type, request_date, status, notes);
    res.redirect(`/usersHome/YourRequest`);  // Sau khi gửi yêu cầu, điều hướng đến trang "Your Request"
}

//time sheet
const timesheetRequest = async function (req, res, next) {
    const userId = req.user.userId;
    try {
        let results = await ViewUserRequest(userId);
        // console.log("ten user", userId);
        res.render('UserTimeSheet.ejs', { listUser: results });
    } catch (error) {
        console.error('Error retrieving papers:', error);
        next(error);
    }
}

module.exports = {
    handleLogin, HomeUser, UserRequest, PostUserRequest, getProfileUser, getUpdateUser, postUpdateProfile, timesheetRequest
}