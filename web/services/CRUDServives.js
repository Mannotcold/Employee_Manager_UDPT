const connection = require('../config/database')

const getAllUsers = async () => {
    let [results, fields] = await connection.query(`select * from Users u `);
    return results;
}


const getUserbyID = async (userId) => {
    let [results, fields] = await connection.query(`select * from Users u where id = ?`, [userId]);
    let user = results && results.length > 0 ? results[0] : {};
    return user;
}

const updateUserbyID = async (username, password, type, userID) => {
    const [results, fields] = await connection.query(`UPDATE Users SET taikhoan = ? , matkhau = ?, loaiTK = ? WHERE id = ?`, [username, password, type, userID]);
    let user = results && results.length > 0 ? results[0] : {};
    return user;
}

const DeleteUserbyID = async (userID) => {
    
    const [results, fields] = await connection.query(`DELETE FROM Users WHERE id = ?`, [userID.id]);
    // let user = results && results.length > 0 ? results[0] : {};
    // return user;
}


module.exports = {
    getAllUsers, getUserbyID, updateUserbyID, DeleteUserbyID
}