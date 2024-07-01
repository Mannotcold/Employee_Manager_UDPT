const connection = require('../config/database')

const getHomepage = function (req, res, next) {
    res.render('Home.ejs');
}

const getLoginpage = function (req, res, next) {
    res.render('Login.ejs');
}


const getRegisterpage = function (req, res, next) {
    res.render('register.ejs');
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
    getHomepage, getProductpage, getLoginpage, getRegisterpage
}