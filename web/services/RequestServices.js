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

const SendUserRequest = async (userId, requestType, requestDate, status, notes) => {
    let results;
    const requestData = {
        requestId: null, // MongoDB sẽ tự động tạo requestId
        employeeId: userId,
        requestType: requestType,
        status: status,
        details: {
            startDate: requestDate,  // Sử dụng requestDate từ form
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


module.exports = {
    getRequest, updateRequest, ViewUserRequest, SendUserRequest
}