let handleLogin = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    // check email exist
    //compare password
    // return userInfor
    //access_token: JWT json web token
    return res.status(200).json({
        yourUsername: username,
        yourpassword: password

    })
}

module.exports = {
    handleLogin
}