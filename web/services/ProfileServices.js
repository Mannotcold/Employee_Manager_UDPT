const axios = require('axios');

const getAllProfile = async () => {
    let results;
    try {
        const response = await axios.get('http://localhost:8760/api/profiles');
        results = response.data;

        console.log(results);  // Sau đó log dữ liệu ra console
    } catch (error) {
        console.error('Error fetching data from API Java:', error);

    }
    return results;
}

const getProfileUserbyID = async (Id) => {
    let results;
    try {
        const response = await axios.get(
            `http://localhost:8760/api/profiles/${Id}?`
        );
        results = response.data;

        console.log(results);  // Sau đó log dữ liệu ra console
    } catch (error) {
        console.error('Error fetching data from API Java:', error);

    }
    return results;
}

const getProfileUserbyIDemployee = async (Id) => {
    let results;
    try {
        const response = await axios.get(
            `http://localhost:8760/api/profilesid/${Id}?`
        );
        results = response.data;

        console.log(results);  // Sau đó log dữ liệu ra console
    } catch (error) {
        console.error('Error fetching data from API Java:', error);

    }
    return results;
}

// Hàm updateProfile để thực hiện cập nhật thông tin nhân viên trong cơ sở dữ liệu
const updateProfile = async (id, employeeID, name, dob, gender, citizenID, taxCode, address, phone, email, bankAccount, pointReward) => {
    try {
        // Gửi yêu cầu POST để cập nhật thông tin nhân viên
        const response = await axios.post(
            `http://localhost:8760/api/profiles/${id}`, // Đường dẫn API
            {
                employee_id: employeeID,
                name: name,
                dob: dob,
                gender: gender,
                citizenId: citizenID,
                taxCode: taxCode,
                address: address,
                phone: phone,
                email: email,
                bankAccount: bankAccount,
                point_reward: pointReward
            }
        );


        // Log dữ liệu kết quả trả về từ API
        console.log(">>>API response data: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};


const AddProfile = async (employeeID) => {
    try {
        console.log(">>>data: ", employeeID);
        // Gửi yêu cầu POST để cập nhật thông tin nhân viên
        const response = await axios.post(
            `http://localhost:8760/api/profiles`, // Đường dẫn API
            {
                employeeId: employeeID,
            }
        );


        // Log dữ liệu kết quả trả về từ API
        console.log(">>>API response data: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};



async function searchUsers(keyword, category) {

    let results;
    try {
        // Xây dựng URL dựa trên tiêu chí tìm kiếm
        const { citizenId, phone, name } = category;
        let url = 'http://localhost:8760/api/profilesby?';

        if (category === "citizenId") {
            url += `citizenId=${keyword}`;
        } else if (category === "phone") {
            url += `phone=${keyword}`;
        } else if (category === "name") {
            url += `name=${encodeURIComponent(keyword)}`; // Encode để xử lý các khoảng trắng trong tên
        } else {
            throw new Error('No search criteria provided');
        }
        console.log("sdadsadsasa", url)

        // Gửi yêu cầu đến API Java
        const response = await axios.get(url);
        results = response.data;

        console.log(results); // Log kết quả ra console
    } catch (error) {
        console.error('Error fetching data from API Java:', error);
    }
    return results;

}

module.exports = {
    getAllProfile, getProfileUserbyID, updateProfile, searchUsers,
    getProfileUserbyIDemployee, AddProfile
}