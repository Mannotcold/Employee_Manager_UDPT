const connection = require('../config/database')
const { getAllUsers, getUserbyID, updateUserbyID, DeleteUserbyID } = require('../services/LoginServives')

const db = require('../models/index')
const bcrypt = require('bcrypt');
// const { Account } = require('../models');

const getHomepage = function (req, res, next) {
    res.render('Home.ejs');
}

const getLoginpage = function (req, res, next) {
    res.render('Login.ejs');
}

const getAdminpage = async function (req, res, next) {
    const userId = req.user.userId;
    let results = await getAllUsers();
    res.render('admin.ejs', { listusers: results });

}

const getedituserpage = async function (req, res, next) {
    const userId = req.params.id
    let user = await getUserbyID(userId);
    res.render('edituser.ejs', { userEdit: user });
}

const postUpdatepage = async function (req, res, next) {
    let userID = req.body.userID;
    let username = req.body.username;
    let password = req.body.password;
    let type = req.body.type;

    // console.log(">>>req.body: ", username, password, type);

    // const [results, fields] = await connection.query(`UPDATE Users SET taikhoan = ? , matkhau = ?, loaiTK = ? WHERE id = ?`, [username, password, type, userID]);
    // console.log(">>>req.body: ", results);
    let updateuser = await updateUserbyID(username, password, type, userID);
    res.redirect(`/`)
}

const postDeletepage = async function (req, res, next) {
    // let userID = req.body.userID;
    let userID = req.params;
    // const id = userID;
    // const [results, fields] = await connection.query(`UPDATE Users SET taikhoan = ? , matkhau = ?, loaiTK = ? WHERE id = ?`, [username, password, type, userID]);
    // console.log(">>>req.body: ", results);
    let updateuser = await DeleteUserbyID(userID);
    res.redirect(`/adminhome`)
}


const getRegisterpage = function (req, res, next) {
    res.render('register.ejs');
    // res.send('sâsffsa');
}

// const postRegisterpage = async function (req, res, next) {

//     let username = req.body.username;
//     let password = req.body.password;
//     let role = req.body.type;

//     // let [username, password, type ]  = req.body;

//     // with placeholder
//     // connection.query(
//     //     `INSERT INTO Users (taikhoan, matkhau, loaiTK) VALUES (?, ?, ?)`,
//     //     [username, password, type],
//     //     function (err, results) {
//     //         console.log(results);
//     //         res.send('thanh cong');
//     //     }
//     // );
//     // const [results, fields] = connection.query(
//     //     `INSERT INTO Users (taikhoan, matkhau, loaiTK) VALUES (?, ?, ?)`,
//     //     [username, password, type]
//     // );

//     // console.log(">>>req.body: ", username, password, type);



//     // const [results, fields] = await connection.query(
//     //     'INSERT INTO Users (taikhoan, matkhau, loaiTK) VALUES (?, ?, ?)',
//     //     [username, password, type]
//     // );
//     // console.log(">>>req.body: ", results);
//     // res.send('thanh cong');
// }

const postRegisterpage = async function (req, res, next) {
    try {
        let username = req.body.username;
        let password = req.body.password;
        let role = req.body.type;

        // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
        const passwordHash = await bcrypt.hash(password, 10);

        // Thêm bản ghi vào bảng Accounts
        const [results, fields] = await connection.query(
            'INSERT INTO Accounts (username, password_hash, role) VALUES (?, ?, ?)',
            [username, passwordHash, role]
        );

        // Trả về phản hồi thành công
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while registering the user' });
    }
};

let user = [];
const getProductpage = (req, res) => {
    connection.query(
        'select * from Users u',
        function (err, results, fields) {
            users = results;
            // console.log(">>>results home page= ", results);
            console.log(">> check users: ", users);
            res.send(JSON.stringify(users));
            // res.send('sâsffsa');

        }
    );

}

module.exports = {
    getHomepage, getProductpage, getLoginpage, getRegisterpage,
    postRegisterpage, getAdminpage, getedituserpage, postUpdatepage, postDeletepage
}