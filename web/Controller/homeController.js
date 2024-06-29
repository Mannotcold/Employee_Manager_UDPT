const getHomepage = function (req, res, next) {
    res.render('Home.ejs');}

const getLoginpage = function (req, res, next) {
    res.render('Login.ejs');
}

const getProductpage = (req, res) => {
    res.send('sâsffsa');
}

module.exports = {
    getHomepage, getProductpage, getLoginpage
}