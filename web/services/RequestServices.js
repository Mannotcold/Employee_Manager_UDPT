const axios = require('axios');

const getRequest = async () => {
    let results;
    try {
        const response = await axios.get('http://localhost:8080/api/requests');
        results = response.data;

        console.log(results);  // Sau đó log dữ liệu ra console
    } catch (error) {
        console.error('Error fetching data from API Java:', error);

    }
    return results;
}

const updateRequest = async (requestId, status, approvedBy) => {
    try {
        // Gửi yêu cầu POST để cập nhật yêu cầu
        const response = await axios.post(
            `http://localhost:8080/api/requests/ad/${requestId}?status=${status}&approvedBy=${approvedBy}`
        );

        // Log dữ liệu kết quả trả về từ API
        console.log(response.data);
    } catch (error) {
        console.error('Error updating request:', error);
    }
}

const ViewUserRequest = async (userId) => {
    let results;
    try {
        const response = await axios.get(
            `http://localhost:8080/api/requests/${userId}?`
        );
        results = response.data;

        console.log(results);  // Sau đó log dữ liệu ra console
    } catch (error) {
        console.error('Error fetching data from API Java:', error);

    }
    return results;
}

const ViewUserApprovedRequest = async (userId) => {
    let results;
    try {
        const response = await axios.get(
            `http://localhost:8080/api/requestsandstatus/${userId}?`
        );
        results = response.data;

        console.log(results);  // Sau đó log dữ liệu ra console
    } catch (error) {
        console.error('Error fetching data from API Java:', error);

    }
    return results;
}

const generateRequestId = (userId) => {
    const randomDigits = Math.floor(100 + Math.random() * 900); // Tạo số ngẫu nhiên có 3 chữ số
    return `REQ${userId}${randomDigits}`;
};
const SendUserRequest = async (userId, requestType, requestDate, request_end, status, notes) => {
    let results;
    const requestId = generateRequestId(userId);
    const requestData = {
        requestId: requestId, // MongoDB sẽ tự động tạo requestId
        employeeId: userId,
        requestType: requestType,
        status: status,
        details: {
            startDate: requestDate,
            endDate: request_end,  // Sử dụng requestDate từ form
            reason: notes || 'No additional notes'  // Ghi chú từ form, nếu không có sẽ là 'No additional notes'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        approvedBy: null
    };

    try {
        const response = await axios.post(
            `http://localhost:8080/api/requests`,
            requestData // Gửi dữ liệu yêu cầu trong request body
        );
        results = response.data;
        console.log(results);  // Log dữ liệu ra console
    } catch (error) {
        console.error('Error sending data to API Java:', error);
    }
    return results;
}


const GetRequestByID = async (requestId) => {
    let results;
    try {
        const response = await axios.get(
            `http://localhost:8080/api/requestsbyrequestId/${requestId}?`
        );
        results = response.data;

        console.log("dasdasdas", results);  // Sau đó log dữ liệu ra console
    } catch (error) {
        console.error('Error fetching data from API Java:', error);

    }
    return results;
}

const UpdateAllRequest = async (requestId, id, userId, requestType, requestDate, request_end, status, notes) => {
    let results;
    const requestData = {
        requestId: requestId,
        employeeId: userId,
        requestType: requestType,
        status: status,
        details: {
            startDate: requestDate,
            endDate: request_end,
            reason: notes || 'No additional notes'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        approvedBy: null
    };

    console.log("Request Data:", requestData);
    console.log("API Response:", `http://localhost:8080/api/requestsupdate/${id}`);
    try {
        const response = await axios.post(
            `http://localhost:8080/api/requestsupdate/${id}`, // Đảm bảo rằng id không chứa dấu phẩy
            requestData
        );
        results = response.data;
        console.log("API Response:", `http://localhost:8080/api/requestsupdate/${id}`);
        console.log("API Response:", results);
    } catch (error) {
        console.error('Error sending data to API Java:', error.message);
    }
    return results;
};



module.exports = {
    getRequest, updateRequest, ViewUserRequest, SendUserRequest, ViewUserApprovedRequest, GetRequestByID, UpdateAllRequest
}