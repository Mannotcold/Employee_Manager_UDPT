const connection = require('../config/database')
const axios = require('axios');
const getAllUsers = async () => {
    let [results, fields] = await connection.query(`select * from Accounts u `);
    return results;
}

const getAllProfile = async () => {
    let [results, fields] = await connection.query(`SELECT * FROM Employees`);

    // Định dạng lại ngày tháng cho tất cả các dòng
    results.forEach(user => {
        if (user.dob) {
            user.dob = new Date(user.dob).toISOString().split('T')[0];
        }
    });

    return results;
}




async function searchUsers(keyword, category) {

    if (category === "citizen_id") {
        let query = "SELECT * FROM Employees WHERE citizen_id LIKE ?";
        let params = [`%${keyword}%`];
        let [results, fields] = await connection.query(query, params); // db.query là hàm thực hiện truy vấn SQL trong database

        return results;
    }

    if (category === "phone") {
        let query = "SELECT * FROM Employees WHERE phone LIKE ?";
        let params = [`%${keyword}%`];
        let [results, fields] = await connection.query(query, params); // db.query là hàm thực hiện truy vấn SQL trong database

        return results;
    }

    if (category === "name") {
        let query = "SELECT * FROM Employees WHERE name LIKE ?";
        let params = [`%${keyword}%`];
        let [results, fields] = await connection.query(query, params); // db.query là hàm thực hiện truy vấn SQL trong database

        return results;
    }

}


const getProfileUserbyID = async (Id) => {
    let [results, fields] = await connection.query(`SELECT * FROM Employees WHERE employee_id = ?`, [Id]);
    let User = results && results.length > 0 ? results[0] : {};
    results.forEach(user => {
        if (user.dob) {
            user.dob = new Date(user.dob).toISOString().split('T')[0];
        }
    });
    return results;
}

const DeleteProfileUserbyID = async (employeeId) => {
    try {
        await connection.query('DELETE FROM Activities WHERE employee_id = ?', [employeeId]);
        await connection.query('DELETE FROM TIMESHEET WHERE employee_id = ?', [employeeId]);
        await connection.query('DELETE FROM REQUEST WHERE employee_id = ?', [employeeId]);
        await connection.query('DELETE FROM LEAVEREQUEST WHERE employee_id = ?', [employeeId]);
        await connection.query('DELETE FROM WFH WHERE employee_id = ?', [employeeId]);
        await connection.query('DELETE FROM UpdateHistory WHERE employee_id = ?', [employeeId]);
        await connection.query('DELETE FROM RedemptionRequests WHERE employee_id = ?', [employeeId]);
        const [results, fields] = await connection.query('DELETE FROM Employees WHERE employee_id = ?', [employeeId]);

        console.log(results);
        return results;
    } catch (error) {
        console.error('Error deleting profile:', error);
        throw error;
    }
};





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
    getAllUsers, getUserbyID, updateUserbyID, DeleteUserbyID, getAllProfile, searchUsers, getProfileUserbyID, DeleteProfileUserbyID
}