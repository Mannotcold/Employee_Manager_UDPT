const connection = require('../config/database');
const jwt = require('jsonwebtoken');
const SECRET_KEY = '123456';
const bcrypt = require('bcrypt');

let handleLogin = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log("đasadsdsdsa", username);
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
        if (user.role === "member") {
            return res.redirect('/AuthurHome');
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            errCode: 4,
            message: 'Internal server error!'
        });
    }
}



module.exports = {
    handleLogin
}