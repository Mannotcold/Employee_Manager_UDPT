const connection = require('../config/database')

const getHomepage = function (req, res, next) {
    res.render('Home.ejs');
}

const getLoginpage = function (req, res, next) {
    res.render('Login.ejs');
}

const getAdminpage = function (req, res, next) {
    res.render('admin.ejs');
    // res.send('sâsffsa');
}


const getRegisterpage = function (req, res, next) {
    res.render('register.ejs');
    // res.send('sâsffsa');
}

const postRegisterpage = function (req, res, next) {
    
    // let username = req.body.username;
    // let password = req.body.password;
    // let type = req.body.type;

    let { username, password, type } = req.body;

    // with placeholder
    connection.query(
        `INSERT INTO Users (taikhoan, matkhau, loaiTK) VALUES (?, ?, ?)`,
        [username, password, type],
        function (err, results) {
            console.log(results);
            res.send('thanh cong');
        }
    );
    console.log(">>>req.body: ", username, password, type);
    
    // res.send('sâsffsa');
}



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
    postRegisterpage, getAdminpage
}